import * as React from 'react';
import * as fetchJsonp from 'fetch-jsonp';
import styled from 'styled-components';

import { StateAndUpdater, StateProvider, DebouncePropagator, AsyncResolver } from 'reenhance-components';


const Dropdown = styled.div`
  position: relative;
  font: normal .8em sans-serif;
`;

const Input = styled.input`
  margin: 0;
  border: 1px solid silver;
  border-radius: 3px;
  font-family: inherit;
  font-size: 100%;
  -webkit-appearance: searchfield;
`;

const SuggestsUl = styled.ul`
  position: absolute;
  z-index: 1;
  top: 5px;
  padding: 0;
  border: 1px solid silver;
  background-color: white;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  list-style: none;
`;

const SuggestsLi = styled.li`
  padding: 0 10px;
  cursor: pointer;
  &:hover {
    background-color:silver;
  }
`;


const queryToUrl =
  (query: string) =>
    `https://completion.amazon.com/search/complete?search-alias=aps&client=amazon-search-ui&mkt=1&q=${query}`;

const asyncFetch =
  ({ query }: any) =>
    fetchJsonp(queryToUrl(query))
      .then(res => res.json());

const SuggestAsyncResolver = AsyncResolver<any, { query: string }>('query', []);

const Suggests = ({ query, setQuery }: any) => (
  <SuggestAsyncResolver query={query} subject={asyncFetch}>
    {props => (
      <SuggestsUl>
        {props[1] && props[1].length > 0 ? props[1].map((str: string) => (
          <SuggestsLi key={str} onClick={() => setQuery(str)}>{str}</SuggestsLi>
        )) : <li>No results</li>}
      </SuggestsUl>
    )}
  </SuggestAsyncResolver>
);

const InputState = StateProvider<string>('');
const SuggestDebounce = DebouncePropagator<{ query: string }>({ query: '' });

export const SuggestedInput = () => (
  <InputState>
    {({ state: query, setState: setQuery }: StateAndUpdater<string>) => (
      <Dropdown>
        <Input type="search" value={query} onChange={e => setQuery(e.target.value)} />
        <SuggestDebounce
          time={200}
          query={query}
        >
          {({ query }: any) => query && (<Suggests query={query} setQuery={setQuery} />)}
        </SuggestDebounce>
      </Dropdown>
    )}
  </InputState>
);
