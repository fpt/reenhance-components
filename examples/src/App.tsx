import * as React from 'react';
import { render } from 'react-dom';

import { Albums } from './ItunesMusic';
import { ToggleAlbums } from './Toggle';


const appElementId = '#root';


const App: React.StatelessComponent<React.Props<{}>> = () => (
  <>
    <div>
      <h3>Albums</h3>
      <ToggleAlbums one="jazz" two="blues" />
    </div>
  </>
);

render((<App/>), document.querySelector(appElementId));
