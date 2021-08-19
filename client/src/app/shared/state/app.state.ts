import { ActionReducerMap } from "@ngrx/store";
import { LayoutState } from "./display-state";
import { reducer } from "./display-state/layout.reducer";

export const reducers: ActionReducerMap<AppState> = {
  layoutState: reducer,
};

export interface AppState {
  layoutState: LayoutState.State;
}
