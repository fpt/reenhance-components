import * as React from 'react';
import { withState } from 'recompose';


type mapper<TInner, TOutter> = (input: TInner) => TOutter;

export interface StateAndUpdater<TState> {
  state: TState;
  setState: (newState: TState) => TState;
}

interface OuterProps<TState> {
  children?: (props: StateAndUpdater<TState>) => React.ReactElement<any>;
}

type StateProviderType =
  <TState, TExtOuter = {}>(initialState: TState | mapper<TExtOuter, TState>) =>
    React.ComponentType<TExtOuter>;


export const StateProvider: StateProviderType =
  <TState, TExtOuter = {}>(initialState: TState | mapper<TExtOuter, TState>) =>
    withState<OuterProps<TState> & TExtOuter, TState, 'state', 'setState'>('state', 'setState', initialState)(
      (props: OuterProps<TState> & StateAndUpdater<TState>) =>
        props.children ? props.children(props) : null,
    );
