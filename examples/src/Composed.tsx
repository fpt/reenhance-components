import * as React from 'react';

import { Compose, StateAndUpdater, StateProvider, ObjectWatcher } from 'reenhance-components';


interface OuterProps {
  src: string;
}

const LoadedState = StateProvider<boolean>(false);
const ImageRefWatcher = ObjectWatcher<React.RefObject<any>>(React.createRef(), 'current');

export const ComposedImage: React.StatelessComponent<OuterProps> =
  ({ src }) => (
    <Compose>
      <ImageRefWatcher/>
      <LoadedState/>
      {(imageRef: React.RefObject<any>, s: StateAndUpdater<boolean>) => {
        const complete = imageRef.current && imageRef.current.complete;

        return (
          <div>
            {!complete ? (
              <svg width="100" height="100" viewBox="0 0 100 100">  
                <rect width="100" height="100" rx="10" ry="10" fill="#CCC" />
              </svg>
            ) : null}
            <img
              src={src}
              style={!complete ? { visibility: 'hidden' } : {}}
              ref={imageRef}
              onLoad={() => s.setState(true)}
            />
          </div>
        );
      }}
    </Compose>
  );
