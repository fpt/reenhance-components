import * as React from 'react';
import { componentFromStream } from 'recompose';
import { of, from, combineLatest, Subscribable, BehaviorSubject } from 'rxjs';
import { filter, flatMap, distinctUntilKeyChanged } from 'rxjs/operators';

import { merge } from './Utils';


interface OuterProps<TObject> {
  watch: string;
  children: (props: TObject) => React.ReactElement<any>;
}

type ChildrenType = React.ReactElement<any>;

interface Indexable {
  [name: string]: any;
}


// ProxeeHandler<T extends object, TOut extends object>
const makeWatchProxy =
  <TObject extends Indexable>(targetObject: TObject, watchProp: string, subject$: BehaviorSubject<any>) =>
    new Proxy<TObject>(targetObject, {
      set: (target: TObject, name: string, value: any) => {
        target[name] = value;

        if (name === watchProp) {
          subject$.next({ name, value });
        }
        return true;
      },
      get: (target: TObject, name: string) => target[name],
    });


export const ObjectWatcher =
  <TObject extends Indexable>(targetObject: TObject) =>
    componentFromStream<OuterProps<TObject>>(
      (props$: Subscribable<OuterProps<TObject>>) => {
        const observation$ = new BehaviorSubject<any>(null);

        const proxy$ = from(props$).pipe(
          distinctUntilKeyChanged('watch'),
          flatMap(
            (props: OuterProps<TObject>) =>
              of(makeWatchProxy<TObject>(targetObject, props.watch, observation$)),
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