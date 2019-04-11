import * as React from 'react';


type RenderFn<RenderPropsType extends any[]> = (...args: RenderPropsType) => JSX.Element;

type ChildType<RenderPropsType extends any[]> = JSX.Element | RenderFn<RenderPropsType>;

interface ChildrenType<RenderPropsType extends any[]> {
  children: ChildType<RenderPropsType>[];
}

export const Compose =
  <RenderPropsType extends any[]>(props: ChildrenType<RenderPropsType>) => {
    const renderProps: any = [];

    let cmps: ChildType<RenderPropsType>[] = [...props.children];
    const render: ChildType<RenderPropsType> | undefined = cmps.pop();
    if (!render) {
      return null;
    }

    cmps = cmps.reverse();

    const renderFn: () => JSX.Element = () => {
      if (!(render instanceof Function)) {
        return render;
      }
      return render(...renderProps);
    };

    const resultFn = cmps.reduce<() => JSX.Element>(
      (prevFn: () => JSX.Element, el: JSX.Element) =>
        () => React.cloneElement(
          el,
          el.props,
          (props: any) => {
            renderProps.push(props);
            return prevFn();
          },
        ),
      renderFn,
    );

    return resultFn();
  };
