import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
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
  router: routerReducer,
};

export interface AppState {
  layoutState: LayoutState.State;
  gridState: GridState.State;
  widgetState: WidgetState.State;
  router: RouterReducerState;
}
