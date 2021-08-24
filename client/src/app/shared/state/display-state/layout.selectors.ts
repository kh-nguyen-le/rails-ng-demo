import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Layout } from '../../models/layout.model';
import * as fromState from './layout.state';

export const adapter: EntityAdapter<Layout> = createEntityAdapter<Layout>();

export const initialState: fromState.State = adapter.getInitialState({
  selectedLayoutId: null,
});

export const getLayoutState = createFeatureSelector<fromState.State>(
  'layoutState'
);

export const getSelectedLayoutId = createSelector(
  getLayoutState,
  (state: fromState.State) => state.selectedLayoutId
);

export const {
  selectIds: selectLayoutIds,
  selectEntities: selectLayoutEntities,
  selectAll: selectAllLayouts,
  selectTotal: selectTotalLayouts,
} = adapter.getSelectors(getLayoutState);

export const selectCurrentLayout = createSelector(
  selectLayoutEntities,
  getSelectedLayoutId,
  (layoutEntities, layoutId) => layoutEntities[layoutId]
);

export const getSubGrids = createSelector(
  selectCurrentLayout,
  (layout) => layout.grids
);
