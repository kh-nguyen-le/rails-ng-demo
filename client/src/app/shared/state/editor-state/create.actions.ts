import { createAction, props } from '@ngrx/store';
import { Grid } from '../../models/grid.model';
import { Layout } from '../../models/layout.model';
import { LayoutGrid } from '../../models/layoutgrid.model';
import { Widget } from '../../models/widget.model';

export const createLayout = createAction(
  '[Editor] Create Layout',
  props<{ layout: Layout }>()
);
export const createLayoutSuccess = createAction(
  '[Editor] Create Layout Success',
  props<{ layout: Layout }>()
);
export const createLayoutFail = createAction('[Editor] Create Layout Fail');

export const createGrid = createAction(
  '[Editor] Create Grid',
  props<{ grid: Grid }>()
);
export const createGridSuccess = createAction(
  '[Editor] Create Grid Success',
  props<{ grid: Grid }>()
);
export const createGridFail = createAction('[Editor] Create Grid Fail');

export const createWidget = createAction(
  '[Editor] Create Widget',
  props<{ widget: Widget }>()
);
export const createWidgetSuccess = createAction(
  '[Editor] Create Widget Success',
  props<{ widget: Widget }>()
);
export const createWidgetFail = createAction('[Editor] Create Widget Fail');

export const createLayoutGrid = createAction(
  '[Editor] Add grid to layout',
  props<{ layoutgrid: LayoutGrid }>()
);

export const createLayoutGridSuccess = createAction(
  '[Editor] Add grid to layout Success',
  props<{ layoutgrid: LayoutGrid }>()
);

export const createLayoutGridFail = createAction(
  '[Editor] Add grid to layout Fail'
);

export const deleteLayoutGrid = createAction(
  '[Editor] Remove grid from layout',
  props<{ layoutgrid: LayoutGrid }>()
);

export const deleteLayoutGridSuccess = createAction(
  '[Editor] Remove grid from layout Success',
  props<{ layoutgrid: LayoutGrid }>()
);

export const deleteLayoutGridFail = createAction(
  '[Editor] Remove grid from layout Fail',
  props<{ error: Error }>()
);

export const updateLayoutGrid = createAction(
  '[Editor] Shift grids',
  props<{ layoutgrid: LayoutGrid }>()
);

export const updateLayoutGridSuccess = createAction(
  '[Editor] Shift grids Success',
  props<{ layoutgrid: LayoutGrid }>()
);

export const updateLayoutGridFail = createAction('[Editor] Shift grids Fail');
