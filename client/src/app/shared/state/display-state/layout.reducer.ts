import { Action, createReducer, on } from '@ngrx/store';
import { CreateActions } from '../editor-state';
import * as fromActions from './layout.actions';
import { initialState, adapter } from './layout.selectors';
import * as fromState from './layout.state';

const layoutReducer = createReducer(
  initialState,
  on(fromActions.loadLayoutsSuccess, (state, { layouts }) => {
    return adapter.setAll(layouts, { ...state, selectedLayoutId: null });
  }),
  on(fromActions.deleteLayoutSuccess, (state, { id }) => {
    return adapter.removeOne(id, { ...state, selectedLayoutId: null });
  }),
  on(CreateActions.createLayoutSuccess, (state, { layout }) => {
    return adapter.addOne(layout, { ...state, selectedLayoutId: null });
  }),
  on(fromActions.selectLayout, (state, { id }) => {
    return {...state, selectedLayoutId: id}
  }),
);

export function reducer(
  state: fromState.State | undefined,
  action: Action
): fromState.State {
  return layoutReducer(state, action);
}
