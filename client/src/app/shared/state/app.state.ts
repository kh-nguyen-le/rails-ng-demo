import { ActionReducerMap } from '@ngrx/store';
import {
  gridReducer,
  GridState,
  layoutReducer,
  LayoutState,
  widgetReducer,
  WidgetState,
} from './display-state';

export const reducers: ActionReducerMap<AppState> = {
  layoutState: layoutReducer,
  gridState: gridReducer,
  widgetState: widgetReducer,
};

export interface AppState {
  layoutState: LayoutState.State;
  gridState: GridState.State;
  widgetState: WidgetState.State;
}
