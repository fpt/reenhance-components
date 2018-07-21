import * as React from 'react';
import * as fetchJsonp from 'fetch-jsonp';

import { StateAndUpdater, StateProvider, DebouncePropagator, AsyncResolver } from 'reenhance-components';


const queryToUrl =
  (query: string) =>
    `https://completion.amazon.com/search/complete?search-alias=aps&client=amazon-search-ui&mkt=1&q=${query}`;

const asyncFetch =
  ({ query }: any) =>
    fetchJsonp(queryToUrl(query))
      .then(res => res.json());

const SuggestAsyncResolver = AsyncResolver<any, { query: string }>('query', []);

const Suggests = ({ query }: any) => (
  <SuggestAsyncResolver query={query} subject={asyncFetch}>
    {props => (
      <ul>
        {props[1] && props[1].length > 0 ? props[1].map((str: string) => (
          <li key={str}>{str}</li>
        )) : <li>No results</li>}
      </ul>
    )}
  </SuggestAsyncResolver>
);

const InputState = StateProvider<string>('');
const SuggestDebounce = DebouncePropagator<{ query: string }>({ query: '' });

export const SuggestedInput = () => (
  <InputState>
    {({ state: query, setState: setQuery }: StateAndUpdater<string>) => (
      <div>
        <input value={query} onChange={e => setQuery(e.target.value)} />
        <SuggestDebounce
          time={200}
          query={query}
        >
          {({ query, state }: any) => (
            <div>
              {query && <Suggests query={query}/>}
            </div>
          )}
        </SuggestDebounce>
      </div>
    )}
  </InputState>
);
