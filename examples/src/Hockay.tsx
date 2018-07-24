import * as React from 'react';

import { ObjectWatcher } from 'reenhance-components';


const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 480;
const CIRCLE_RADIUS = 48;

class DraggableState {
  isDown: boolean;
  posX: number;
  posY: number;
  screenX: number;
  screenY: number;

  constructor(initX: number, initY: number) {
    this.isDown = false;
    this.posX = initX;
    this.posY = initY;
    this.screenX = 0;
    this.screenY = 0;
  }

  public mouseDown(e: any) {
    this.isDown = true;
    this.screenX = e.screenX;
    this.screenY = e.screenY;
  }

  public mouseMove(e: any) {
    if (!this.isDown) {
      return;
    }
    const shiftX = e.screenX - this.screenX;
    const shiftY = e.screenY - this.screenY;

    this.posX = this.posX + shiftX;
    this.posY = this.posY + shiftY;
    this.screenX = e.screenX;
    this.screenY = e.screenY;
  }

  public mouseUp(e: any) {
    this.isDown = false;
    this.screenX = 0;
    this.screenY = 0;
  }
}


////////////////////////////////////////
//
// Drag Snap
//

interface DraggableProps {
  color: string;
}

const DraggableCircleBuilder: (initX: number, initY: number) => React.StatelessComponent<DraggableProps> =
  (initX, initY) => {
    const DiscState = ObjectWatcher<DraggableState>(new DraggableState(initX, initY), ['posX', 'posY']);

    return ({ color }) => (
      <DiscState>
        {obj => (
          <circle
            cx={obj.posX}
            cy={obj.posY}
            r={CIRCLE_RADIUS}
            stroke={color}
            fill={'light' + color}
            strokeWidth="3"
            onMouseDown={e => obj.mouseDown(e)}
            onMouseMove={e => obj.mouseMove(e)}
            onMouseUp={e => obj.mouseUp(e)}
          />
        )}
      </DiscState>
    );
  };

export const SVGHockay: React.StatelessComponent<React.Props<{}>> = () => {
  const DraggableCircleA = DraggableCircleBuilder(CANVAS_WIDTH * .25, CANVAS_HEIGHT / 2);
  const DraggableCircleB = DraggableCircleBuilder(CANVAS_WIDTH * .5, CANVAS_HEIGHT / 2);
  const DraggableCircleC = DraggableCircleBuilder(CANVAS_WIDTH * .75, CANVAS_HEIGHT / 2);

  return (
    <div>
      <div>
        <svg style={{ width: CANVAS_WIDTH + 'px', height: CANVAS_HEIGHT + 'px', border: '1px solid silver' }}>
          <DraggableCircleA color="blue" />
          <DraggableCircleB color="pink" />
          <DraggableCircleC color="green" />
        </svg>
      </div>
    </div>
  );
};
