import * as React from 'react';
import { render } from 'react-dom';

import { Albums, StaticAlbums } from './ItunesMusic';
import { ToggleAlbums } from './Toggle';


const appElementId = '#root';


const App: React.StatelessComponent<React.Props<{}>> = () => (
  <>
    <div>
      <h3>Albums</h3>
      <ToggleAlbums one="jazz" two="blues" />

      <h3>Static Albums</h3>
      <StaticAlbums />
    </div>
  </>
);

render((<App/>), document.querySelector(appElementId));
