import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Widget } from "../../models/widget.model";
import * as fromState from './widget.state';


export const adapter: EntityAdapter<Widget> = createEntityAdapter<Widget>();

export const initialState: fromState.State = adapter.getInitialState({
  selectedWidgetId: null,
});

export const getSelectedWidgetId = (
    state: fromState.State
  ): number | string => state.selectedWidgetId;
  
  
  export const getWidgetState = createFeatureSelector<fromState.State>(
    'widgetState'
  );
  
  const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = adapter.getSelectors();
  
  export const selectWidgetIds = createSelector(getWidgetState, selectIds);
  export const selectWidgetEntities = createSelector(
    getWidgetState,
    selectEntities
  );
  
  export const selectAllWidgets = createSelector(getWidgetState, selectAll);
  
  export const selectWidgetTotal = createSelector(getWidgetState, selectTotal);