import * as React from 'react';

import { StateAndUpdater, StateProvider } from 'reenhance-components';
import { Albums } from './ItunesMusic';


const ToggleState = StateProvider<boolean>(false);


export const ToggleAlbums: React.StatelessComponent<{ one: string, two: string}> = ({ one, two }) => (
  <ToggleState>
    {({ state, setState }: StateAndUpdater<boolean>) => (
      <>
        <button onClick={() => setState(!state)}>genre is {state ? one : two}</button>
        <Albums query={state ? one : two}/>
      </>
    )}
  </ToggleState>
);
