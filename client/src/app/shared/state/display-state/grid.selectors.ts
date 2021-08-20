import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Grid } from "../../models/grid.model";
import * as fromState from './grid.state';


export const adapter: EntityAdapter<Grid> = createEntityAdapter<Grid>();

export const initialState: fromState.State = adapter.getInitialState({
  selectedGridId: null,
});

export const getSelectedGridId = (
    state: fromState.State
  ): number | string => state.selectedGridId;
  
  
  export const getGridState = createFeatureSelector<fromState.State>(
    'gridState'
  );
  
  const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = adapter.getSelectors();
  
  export const selectGridIds = createSelector(getGridState, selectIds);
  export const selectGridEntities = createSelector(
    getGridState,
    selectEntities
  );
  
  export const selectAllGrids = createSelector(getGridState, selectAll);
  
  export const selectGridTotal = createSelector(getGridState, selectTotal);