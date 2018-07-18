import * as React from 'react';

import { StateAndUpdater, StateProvider, DebouncePropagator } from 'reenhance-components';
import { Albums } from './ItunesMusic';


const ToggleState = StateProvider<boolean>(false);
const GenreDebounce = DebouncePropagator<{ genre: string }>({ genre: 'unknown' });

export const ToggleAlbums: React.StatelessComponent<{ one: string, two: string}> = ({ one, two }) => (
  <ToggleState>
    {({ state, setState }: StateAndUpdater<boolean>) => (
      <>
        <button onClick={() => setState(!state)}>
          genre is {state ? one : two}
        </button>
        <GenreDebounce
          time={500}
          genre={state ? one : two}
        >
          {({ genre }) => <div>genre is {genre}</div>}
        </GenreDebounce>
        <Albums query={state ? one : two} />        
      </>
    )}
  </ToggleState>
);
