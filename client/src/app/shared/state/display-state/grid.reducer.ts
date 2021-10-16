import { Action, createReducer, on } from '@ngrx/store';
import { GridWidget } from '../../models/gridwidget.model';
import { CreateActions } from '../editor-state';
import * as fromActions from './grid.actions';
import { initialState, adapter } from './grid.selectors';
import * as fromState from './grid.state';

const gridReducer = createReducer(
  initialState,
  on(fromActions.loadGridsSuccess, (state, { grids }) => {
    return adapter.upsertMany(grids, { ...state });
  }),
  on(fromActions.deleteGridSuccess, (state, { id }) => {
    return adapter.removeOne(id, { ...state, selectedGridId: null });
  }),
  on(CreateActions.createGridSuccess, (state, { grid }) => {
    return adapter.addOne(grid, { ...state, selectedGridId: null });
  }),
  on(fromActions.selectGrid, (state, { id }) => {
    return { ...state, selectedGridId: id };
  }),
  on(fromActions.fetchGridSuccess, (state, { grid }) => {
    return adapter.upsertOne(grid, { ...state, selectedGridId: grid.id });
  }),
  on(fromActions.updateGridSuccess, (state, { update }) => {
    return adapter.updateOne(update, { ...state, selectedGridId: update.id });
  }),
  on(CreateActions.createGridWidgetSuccess, (state, { gridwidget }) => {
    const id = gridwidget.grid_id;
    const grid = state.entities[id];
    const gws: GridWidget[] = grid.grid_widgets;
    const newGWs: GridWidget[] = [...gws];
    newGWs.push(gridwidget);
    const newGrid = { ...grid, grid_widgets: newGWs };

    return adapter.upsertOne(newGrid, { ...state, selectedGridId: id });
  }),
  on(CreateActions.deleteGridWidgetSuccess, (state, { gridwidget }) => {
    const id = gridwidget.grid_id;
    const grid = state.entities[id];
    const gws: GridWidget[] = grid.grid_widgets;
    const newGWs: GridWidget[] = [...gws].filter(
      (gw: GridWidget) => gw.id !== gridwidget.id
    );
    const newGrid = { ...grid, grid_widgets: newGWs };

    return adapter.upsertOne(newGrid, {
      ...state,
      selectedGridId: gridwidget.grid_id,
    });
  }),
  on(CreateActions.updateGridWidgetSuccess, (state, { gridwidget }) => {
    const id = gridwidget.grid_id;
    const grid = state.entities[id];
    const gws: GridWidget[] = grid.grid_widgets;
    const newGWs: GridWidget[] = [...gws].filter(
      (gw: GridWidget) => gw.id !== gridwidget.id
    );
    newGWs.push(gridwidget);
    const newGrid = { ...grid, grid_widgets: newGWs };
    
    return adapter.upsertOne(newGrid, { ...state, selectedGridId: id});
  }),
);

export function reducer(
  state: fromState.State | undefined,
  action: Action
): fromState.State {
  return gridReducer(state, action);
}
