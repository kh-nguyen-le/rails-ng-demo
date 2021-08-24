import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Widget } from '../../models/widget.model';
import * as fromState from './widget.state';

export const adapter: EntityAdapter<Widget> = createEntityAdapter<Widget>();

export const initialState: fromState.State = adapter.getInitialState({
  selectedWidgetId: null,
});

export const getWidgetState = createFeatureSelector<fromState.State>(
  'widgetState'
);

export const getSelectedWidgetId = createSelector(
  getWidgetState,
  (state: fromState.State) => state.selectedWidgetId
);

export const {
  selectIds: selectWidgetId,
  selectEntities: selectWidgetEntities,
  selectAll: selectAllWidgets,
  selectTotal: selectTotalWidgets,
} = adapter.getSelectors(getWidgetState);

export const selectCurrentWidget = createSelector(
  selectWidgetEntities,
  getSelectedWidgetId,
  (widgetEntities, widgetId) => widgetEntities[widgetId]
);
