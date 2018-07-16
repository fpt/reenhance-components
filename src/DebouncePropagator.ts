import * as React from 'react';
import { componentFromStream } from 'recompose';
import { from, timer, combineLatest } from 'rxjs';
import { debounce } from 'rxjs/operators';


interface TimeProp {
  time: number;
}

interface ChildrenProp<TInner, TOuter> {
  children: (props: TOuter) => React.ReactElement<TInner>;
}

type OuterProps<TInner> =
  TimeProp & ChildrenProp<TimeProp & TInner, TInner> & TInner;

type ChildrenType<TInner> = React.ReactElement<TInner & TimeProp>;


// spreading generic types are not possible in TS 2.x
// See https://github.com/Microsoft/TypeScript/issues/10727
const merge: <A, B>(a: A, b: B) => A & B =
  <A, B>(a: A, b: B) =>
    Object.assign({}, a, b) as any;

export const DebouncePropagator =
  <TInner>(loadingProps?: TInner) =>
    componentFromStream<OuterProps<TInner>>(
    (props$) => {
      const debounced$ = from(props$)
        .pipe(
          debounce((p: OuterProps<TInner>) => timer(p.time)),
        );

      return combineLatest<OuterProps<TInner>, OuterProps<TInner>, ChildrenType<TInner>>(
        props$,
        debounced$,
        (props: OuterProps<TInner>, debounced: OuterProps<TInner>) =>
          props !== debounced && loadingProps ?
            props.children(merge(props, loadingProps)) :
            debounced.children(debounced),
      );
    });
