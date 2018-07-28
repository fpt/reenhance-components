import * as React from 'react';
import { render } from 'react-dom';

import { Albums, StaticAlbums } from './ItunesMusic';
import { ToggleAlbums } from './Toggle';
import { IdImage } from './Image';
import { DivRef, Counter, InputWatcher } from './Watchers';
import { SuggestedInput } from './Suggest';
import { SVGHockay } from './Hockay';


const appElementId = '#root';


const App: React.StatelessComponent<React.Props<{}>> = () => (
  <>
    <div>
      <h3>Image</h3>
      <IdImage />

      <h3>Albums</h3>
      <ToggleAlbums one="jazz" two="blues" />

      <h3>Static Albums</h3>
      <StaticAlbums />

      <h3>Ref</h3>
      <DivRef />

      <h3>ObjWatcher</h3>
      <Counter />

      <h3>InputWatcher</h3>
      <InputWatcher />

      <h3>SuggestedInput</h3>
      <SuggestedInput />

      <h3>SVG Hockay</h3>
      <SVGHockay />
    </div>
  </>
);

render((<App/>), document.querySelector(appElementId));
