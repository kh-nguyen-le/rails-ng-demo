import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Grid } from '../../models/grid.model';
import * as fromState from './grid.state';

export const adapter: EntityAdapter<Grid> = createEntityAdapter<Grid>();

export const initialState: fromState.State = adapter.getInitialState({
  selectedGridId: null,
});

export const getGridState = createFeatureSelector<fromState.State>('gridState');

export const getSelectedGridId = createSelector(
  getGridState,
  (state: fromState.State) => state.selectedGridId
);

export const {
  selectIds: selectGridIds,
  selectEntities: selectGridEntities,
  selectAll: selectAllGrids,
  selectTotal: selectTotalGrids,
} = adapter.getSelectors(getGridState);

export const selectCurrentLayout = createSelector(
  selectGridEntities,
  getSelectedGridId,
  (gridEntities, gridId) => gridEntities[gridId]
);
