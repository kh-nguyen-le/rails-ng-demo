import { Action, createReducer, on } from '@ngrx/store';
import { CreateActions } from '../editor-state';
import * as fromActions from './widget.actions';
import { initialState, adapter } from './widget.selectors';
import * as fromState from './widget.state';

const widgetReducer = createReducer(
  initialState,
  on(fromActions.loadWidgetsSuccess, (state, { widgets }) => {
    return adapter.upsertMany(widgets, state);
  }),
  on(fromActions.deleteWidgetSuccess, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(CreateActions.createWidgetSuccess, (state, { widget }) => {
    return adapter.addOne(widget, state);
  }),
  on(fromActions.selectWidget, (state, { id }) => {
    return { ...state, selectedWidgetId: id };
  }),
  on(fromActions.fetchWidgetSuccess, (state, { widget }) => {
    return adapter.upsertOne(widget, { ...state, selectedWidgetId: widget.id });
  }),
  on(fromActions.updateWidgetSuccess, (state, { update }) => {
    return adapter.updateOne(update, { ...state, selectedWidgetId: update.id });
  })
);

export function reducer(
  state: fromState.State | undefined,
  action: Action
): fromState.State {
  return widgetReducer(state, action);
}
