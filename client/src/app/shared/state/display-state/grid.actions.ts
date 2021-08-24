import { Update } from '@ngrx/entity';
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

export const selectGrid = createAction(
  '[Editor] Select Current Grid',
  props<{ id: number }>()
);

export const fetchGrid = createAction(
  '[Editor] Fetch grid by id',
  props<{ id: number }>()
);

export const fetchGridSuccess = createAction(
  '[Editor] Fetch grid by id Success',
  props<{ grid: Grid }>()
);

export const fetchGridFail = createAction('[Editor] Fetch grid by id Fail');

export const updateGrid = createAction(
  '[Editor] Update Grid',
  props<{ update: Update<Grid> }>()
);

export const updateGridSuccess = createAction(
  '[Editor] Update Grid Success',
  props<{ update: Update<Grid> }>()
);

export const updateGridFail = createAction('[Editor] Update Grid Fail');
