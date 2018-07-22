import * as React from 'react';
import { componentFromStream } from 'recompose';
import { of, from, combineLatest, Subscribable, BehaviorSubject } from 'rxjs';
import { filter, flatMap, distinctUntilKeyChanged } from 'rxjs/operators';


type ChangeHandler = (newValue: any, oldValue: any, propName: string) => void;

interface OuterProps<TObject> {
  watch: string | string[];
  onChange?: ChangeHandler;
  children: (props: TObject) => React.ReactElement<any>;
}

type ChildrenType = React.ReactElement<any>;

interface Indexable {
  [name: string]: any;
}


// ProxeeHandler<T extends object, TOut extends object>
const makeWatchProxy =
  <TObject extends Indexable>(
    targetObject: TObject,
    subject$: BehaviorSubject<any>,
    watchProps: string | string[],
    onChange?: ChangeHandler,
  ) =>
    new Proxy<TObject>(targetObject, {
      set: (target: TObject, name: string, value: any) => {
        const oldValue = target[name];
        target[name] = value;

        if (Array.isArray(watchProps) ? watchProps.includes(name) : name === watchProps) {
          subject$.next({ name, value });
          onChange && onChange(value, oldValue, name);
        }
        return true;
      },
      get: (target: TObject, name: string) => target[name],
    });


export const ObjectWatcher =
  <TObject extends Indexable>(targetObject: TObject) => {
    const observation$ = new BehaviorSubject<any>(null);

    return componentFromStream<OuterProps<TObject>>(
      (props$: Subscribable<OuterProps<TObject>>) => {
        const proxy$ = from(props$).pipe(
          distinctUntilKeyChanged('watch'),
          flatMap(
            (props: OuterProps<TObject>) =>
              of(makeWatchProxy<TObject>(targetObject, observation$, props.watch, props.onChange)),
          ),
        );

        return combineLatest<OuterProps<TObject>, TObject, BehaviorSubject<any>, ChildrenType>(
          props$,
          proxy$,
          observation$,
          (props: OuterProps<TObject>, proxy: TObject, observation: BehaviorSubject<any>) =>
            props.children(proxy),
        );
      });
  };
