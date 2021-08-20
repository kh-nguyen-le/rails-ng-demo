import { createAction, props } from '@ngrx/store';
import { Grid } from '../../models/grid.model';

export const loadGrids = createAction('[Root/API] Load Grids');
export const loadGridsSuccess = createAction(
  '[Root/API] Load Grids Success',
  props<{ grids: Grid[] }>()
);
export const loadGridsFail = createAction('[Root/API] Load Grids Fail');

export const deleteGrid = createAction(
  '[Editor] Delete Grid',
  props<{ id: number }>()
);
export const deleteGridSuccess = createAction(
  '[Editor] Delete Grid Success',
  props<{ id: number }>()
);
export const deleteGridFail = createAction('[Editor] Delete Grid Fail');
