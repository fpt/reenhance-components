import * as React from 'react';

import { StateAndUpdater, StateProvider } from 'reenhance-components';


interface OuterProps {
  src: string;
}

const LoadedState = StateProvider<boolean>(false);

export const ImageWithLoading: React.StatelessComponent<OuterProps> =
  ({ src }) => (
    <LoadedState>
      {({ state: loaded, setState: setLoaded }: StateAndUpdater<boolean>) => (
        <>
          {!loaded ? (
            <svg width="100" height="100" viewBox="0 0 100 100">  
              <rect width="100" height="100" rx="10" ry="10" fill="#CCC" />
            </svg>
          ) : null}
          <img
            src={src}
            style={!loaded ? { visibility: 'hidden' } : {}}
            onLoad={() => setLoaded(true)}
          />
        </>
      )}
    </LoadedState>
  );
