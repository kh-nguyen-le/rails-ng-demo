import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Layout } from "../../models/layout.model";
import * as fromState from './layout.state';


export const adapter: EntityAdapter<Layout> = createEntityAdapter<Layout>();

export const initialState: fromState.State = adapter.getInitialState({
  selectedLayoutId: null,
});

export const getSelectedLayoutId = (
    state: fromState.State
  ): number | string => state.selectedLayoutId;
  
  
  export const getLayoutState = createFeatureSelector<fromState.State>(
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