import { createAction, props } from '@ngrx/store';
import { Grid } from '../../models/grid.model';
import { GridWidget } from '../../models/gridwidget.model';
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

export const createGridWidget = createAction(
  '[Editor] Add widget to grid',
  props<{ gridwidget: GridWidget }>()
);

export const createGridWidgetSuccess = createAction(
  '[Editor] Add widget to grid Success',
  props<{ gridwidget: GridWidget }>()
);

export const createGridWidgetFail = createAction(
  '[Editor] Add widget to grid Fail'
);

export const deleteGridWidget = createAction(
  '[Editor] Remove widget from grid',
  props<{ gridwidget: GridWidget }>()
);

export const deleteGridWidgetSuccess = createAction(
  '[Editor] Remove widget from grid Success',
  props<{ gridwidget: GridWidget }>()
);

export const deleteGridWidgetFail = createAction(
  '[Editor] Remove widget from grid Fail',
  props<{ error: Error }>()
);

export const updateGridWidget = createAction(
  '[Editor] Shift widgets',
  props<{ gridwidget: GridWidget }>()
);

export const updateGridWidgetSuccess = createAction(
  '[Editor] Shift widgets Success',
  props<{ gridwidget: GridWidget }>()
);

export const updateGridWidgetFail = createAction('[Editor] Shift widgets Fail');
