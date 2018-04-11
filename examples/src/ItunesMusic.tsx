import * as React from 'react';

import { AsyncResolver } from 'reenhance-components';


const albumStyle: React.CSSProperties = {
  display: 'inline-block',
  textAlign: 'center',
  margin: '20px',
  font: 'normal smaller Arial',
};


interface Album {
  artistName: string;
  collectionName: string;
  collectionViewUrl: string;
  artworkUrl100: string;
  artistId: string;
  collectionId: string;
}

interface AlbumsResponse {
  resultCount: number;
  results: Album[];
}

interface ErrorResponse {
  error: string;
}

interface AsyncArgs {
  query: string;
}

const queryToUrl =
  (query: string) => `https://itunes.apple.com/search?term=${query}&entity=album&limit=3`;

const asyncFetch =
  ({ query }: AsyncArgs) =>
    fetch(queryToUrl(query))
      .then(res => res.json())
      .catch(err => ({ error: err.toString() }));

const itemRenderer = (itm: Album) => (
  <li style={albumStyle} key={itm.artistId + itm.collectionId}>
    <a href={itm.collectionViewUrl} target="_blank">
      <img src={itm.artworkUrl100} />
      <div>{itm.collectionName}</div>
      <div>{itm.artistName}</div>
    </a>
  </li>
);

const AlbumsAsyncResolver =
  AsyncResolver<AlbumsResponse | ErrorResponse, AsyncArgs>({ resultCount: 0, results: [] });

export const Albums: React.StatelessComponent<AsyncArgs> = ({ query }) => (
  <AlbumsAsyncResolver query={query} subject={asyncFetch}>
    {(props: AlbumsResponse & ErrorResponse) => (
      <div>
        {props.error ? (
          <p>{props.error}</p>
        ) : (
          <ul>
            {props.results.map(itemRenderer)}
          </ul>
        )}
      </div>
    )}
  </AlbumsAsyncResolver>
);
