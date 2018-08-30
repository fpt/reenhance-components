import * as React from 'react';
import { componentFromStream } from 'recompose';
import { of, from, combineLatest, forkJoin, Subscribable, BehaviorSubject } from 'rxjs';
import { filter, flatMap, switchMapTo, zip, distinctUntilKeyChanged } from 'rxjs/operators';


type ChangeHandler = (newValue: any, oldValue: any, propName: string) => void;

interface OuterProps<TObject> {
  onChange?: ChangeHandler;
  children?: (props: TObject) => React.ReactElement<any>;
}

type ChildrenType = React.ReactElement<any>;

interface Indexable {
  [name: string]: any;
}

interface PropChange {
  newValue: any;
  prevValue: any;
  name: string;
}


// ProxeeHandler<T extends object, TOut extends object>
const makeWatchProxy =
  <TObject extends Indexable>(
    targetObject: TObject,
    subject$: BehaviorSubject<PropChange>,
    watchProps: string | string[],
  ) =>
    new Proxy<TObject>(targetObject, {
      set: (target: TObject, name: string, value: any) => {
        const prevValue = target[name];
        target[name] = value;

        if (Array.isArray(watchProps) ? watchProps.includes(name) : name === watchProps) {
          subject$.next({ name, prevValue, newValue: value });
        }
        return true;
      },
      get: (target: TObject, name: string) => target[name],
    });


export const ObjectWatcher =
  <TObject extends Indexable>(targetObject: TObject, watchProps: string | string[]) => {
    const observation$ = new BehaviorSubject<any>(null);
    const proxy = makeWatchProxy<TObject>(targetObject, observation$, watchProps);

    return componentFromStream<OuterProps<TObject>>(
      (props$: Subscribable<OuterProps<TObject>>) => {
        const change$ = from(props$).pipe(
          distinctUntilKeyChanged('onChange'),
          switchMapTo(observation$,
            (props, obs) => {
              props.onChange && obs && props.onChange(obs.newValue, obs.prevValue, obs.name);
              return props;
            },
          ),
        );

        return combineLatest<OuterProps<TObject>, PropChange, any, ChildrenType>(
          props$,
          observation$,
          change$,
          (props: OuterProps<TObject>, obs: PropChange, _: any) =>
            props.children ? props.children(proxy) : React.createElement(React.Fragment),
        );
      });
  };
