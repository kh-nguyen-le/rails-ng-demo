import { Action, createReducer, on } from '@ngrx/store';
import { CreateActions } from '../editor-state';
import * as fromActions from './layout.actions';
import { initialState, adapter } from './layout.selectors';
import * as fromState from './layout.state';

const layoutReducer = createReducer(
  initialState,
  on(fromActions.loadLayoutsSuccess, (state, { layouts }) => {
    return adapter.setAll(layouts, state);
  }),
  on(fromActions.deleteLayoutSuccess, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(CreateActions.createLayoutSuccess, (state, { layout }) => {
    return adapter.addOne(layout, state);
  }),
);

export function reducer(
  state: fromState.State | undefined,
  action: Action
): fromState.State {
  return layoutReducer(state, action);
}
