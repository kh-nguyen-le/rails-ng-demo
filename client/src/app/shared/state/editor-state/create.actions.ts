import { createAction, props } from '@ngrx/store';
import { Grid } from '../../models/grid.model';
import { Layout } from '../../models/layout.model';
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

export const createGrid = createAction('[Editor] Create Grid');
export const createGridSuccess = createAction(
  '[Editor] Create Grid Success',
  props<{ grid: Grid }>()
);
export const createGridFail = createAction('[Editor] Create Grid Fail');

export const createWidget = createAction('[Editor] Create Widget');
export const createWidgetSuccess = createAction(
  '[Editor] Create Widget Success',
  props<{ widget: Widget }>()
);
export const createWidgetFail = createAction('[Editor] Create Widget Fail');
