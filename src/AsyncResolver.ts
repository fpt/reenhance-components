import * as React from 'react';
import { componentFromStream } from 'recompose';
import { from, Observable, combineLatest } from 'rxjs';
import { flatMap } from 'rxjs/operators';


interface SubjectProp<TInner, TSubjectArgs> {
  subject: (args: TSubjectArgs) => Promise<TInner>;
}

interface ChildrenProp<TInner, TOuter> {
  children: (props: TOuter) => React.ReactElement<TInner>;
}

type OuterProps<TInner, TSubjectArgs> = SubjectProp<TInner, TSubjectArgs> & ChildrenProp<SubjectProp<TInner, TSubjectArgs>, TInner>

type ChildrenType<TInner, TSubjectArgs> = React.ReactElement<SubjectProp<TInner, TSubjectArgs>>;

// spreading generic types are not possible in TS 2.x
// See https://github.com/Microsoft/TypeScript/issues/10727
function merge<A, B, C>(a: A, b: B, c: C): A & B & C {
    return Object.assign({}, a, b, c) as any;
}


export const AsyncResolver = <TInner, TSubjectArgs = {}>(initialProps?: TInner) => componentFromStream<OuterProps<TInner, TSubjectArgs> & TSubjectArgs>(
  props$ => {
    const subject$ = from(props$)
      .pipe(
        flatMap((props: SubjectProp<TInner, TSubjectArgs> & TSubjectArgs) => props.subject(props)),
      );

      return combineLatest<OuterProps<TInner, TSubjectArgs> & TSubjectArgs, TInner, ChildrenType<TInner, TSubjectArgs>>(
        props$,
        subject$,
        (props: OuterProps<TInner, TSubjectArgs> & TSubjectArgs, subject: TInner) =>
          props.children(merge(props, initialProps, subject))
      );
  });
