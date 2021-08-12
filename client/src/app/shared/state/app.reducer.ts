import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import {
  Action,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { Layout } from '../models/layout.model';
import * as fromActions from './app.actions';
import * as fromState from './app.state';

export const adapter: EntityAdapter<Layout> = createEntityAdapter<Layout>();

export const initialState: fromState.LayoutState = adapter.getInitialState({
  selectedLayoutId: null,
});

const rootReducer = createReducer(
  initialState,
  on(fromActions.loadLayoutsSuccess, (state, { layouts }) => {
    return adapter.setAll(layouts, state);
  })
);

export function reducer(
  state: fromState.LayoutState | undefined,
  action: Action
): fromState.LayoutState {
  return rootReducer(state, action);
}

export const getSelectedLayoutId = (
  state: fromState.LayoutState
): number | string => state.selectedLayoutId;

export const reducers: ActionReducerMap<fromState.AppState> = {
  layoutState: reducer,
};

export const getLayoutState = createFeatureSelector<fromState.LayoutState>(
  'layoutState'
);

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectLayoutIds = createSelector(getLayoutState, selectIds);
export const selectLayoutEntities = createSelector(
  getLayoutState,
  selectEntities
);

export const selectAllLayouts = createSelector(getLayoutState, selectAll);

export const selectLayoutTotal = createSelector(getLayoutState, selectTotal);
