import * as React from 'react';
import { render } from 'react-dom';

import { Albums, StaticAlbums } from './ItunesMusic';
import { ToggleAlbums } from './Toggle';
import { IdImage } from './Image';
import { DivRef, Counter, InputWatcher } from './Watchers';
import { SuggestedInput } from './Suggest';
import { SVGHockay } from './Hockay';
import { ComposedImage } from './Composed';


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

      <h3>Compose</h3>
      <ComposedImage src={'https://picsum.photos/100/100/?image=1000'} />
    </div>
  </>
);

render((<App/>), document.querySelector(appElementId));
