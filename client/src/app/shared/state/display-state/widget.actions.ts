import { createAction, props } from '@ngrx/store';
import { Widget } from '../../models/widget.model';

export const loadWidgets = createAction('[Root/API] Load Widgets');
export const loadWidgetsSuccess = createAction(
  '[Root/API] Load Widgets Success',
  props<{ widgets: Widget[] }>()
);
export const loadWidgetsFail = createAction('[Root/API] Load Widgets Fail');

export const deleteWidget = createAction(
  '[Editor] Delete Widget',
  props<{ id: number }>()
);
export const deleteWidgetSuccess = createAction(
  '[Editor] Delete Widget Success',
  props<{ id: number }>()
);
export const deleteWidgetFail = createAction('[Editor] Delete Widget Fail');
