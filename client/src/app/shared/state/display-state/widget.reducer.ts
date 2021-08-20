import { Action, createReducer, on } from '@ngrx/store';
import { CreateActions } from '../editor-state';
import * as fromActions from './widget.actions';
import { initialState, adapter } from './widget.selectors';
import * as fromState from './widget.state';

const widgetReducer = createReducer(
  initialState,
  on(fromActions.loadWidgetsSuccess, (state, { widgets }) => {
    return adapter.setAll(widgets, state);
  }),
  on(fromActions.deleteWidgetSuccess, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(CreateActions.createWidgetSuccess, (state, { widget }) => {
    return adapter.addOne(widget, state);
  }),
);

export function reducer(
  state: fromState.State | undefined,
  action: Action
): fromState.State {
  return widgetReducer(state, action);
}
