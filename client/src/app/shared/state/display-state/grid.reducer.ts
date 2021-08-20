import { Action, createReducer, on } from '@ngrx/store';
import * as fromActions from './grid.actions';
import { initialState, adapter } from './grid.selectors';
import * as fromState from './grid.state';

const gridReducer = createReducer(
  initialState,
  on(fromActions.loadGridsSuccess, (state, { grids }) => {
    return adapter.setAll(grids, state);
  }),
  on(fromActions.deleteGridSuccess, (state, { id }) => {
    return adapter.removeOne(id, state);
  })
);

export function reducer(
  state: fromState.State | undefined,
  action: Action
): fromState.State {
  return gridReducer(state, action);
}
