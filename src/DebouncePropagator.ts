import * as React from 'react';
import { componentFromStream } from 'recompose';
import { from, timer, combineLatest } from 'rxjs';
import { debounce, startWith } from 'rxjs/operators';


interface TimeProp {
  time: number;
}

interface ChildrenProp<TInner, TOuter> {
  children: (props: TOuter) => React.ReactElement<TInner>;
}

type OuterProps<TInner> =
  TimeProp & ChildrenProp<TimeProp & TInner, TInner> & TInner;

type ChildrenType = React.ReactElement<any>;


export const DebouncePropagator =
  <TInner>(loadingProps: TInner) =>
    componentFromStream<OuterProps<TInner>>(
    (props$) => {
      const debounced$ = from(props$)
        .pipe(
          debounce((p: OuterProps<TInner>) => timer(p.time)),
          startWith(loadingProps),
        );

      return combineLatest<OuterProps<TInner>, OuterProps<TInner>, ChildrenType>(
        props$,
        debounced$,
        (props: OuterProps<TInner>, debounced: OuterProps<TInner>) =>
          props.children(debounced),
      );
    });
