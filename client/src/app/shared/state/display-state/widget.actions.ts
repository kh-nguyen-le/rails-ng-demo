import { Update } from '@ngrx/entity';
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

export const selectWidget = createAction(
  '[Editor] Select Current Widget',
  props<{ id: number }>()
);

export const fetchWidget = createAction(
  '[Editor] Fetch widget by id',
  props<{ id: number }>()
);

export const fetchWidgetSuccess = createAction(
  '[Editor] Fetch widget by id Success',
  props<{ widget: Widget }>()
);

export const fetchWidgetFail = createAction('[Editor] Fetch widget by id Fail');

export const updateWidget = createAction(
  '[Editor] Update Widget',
  props<{ update: Update<Widget> }>()
);

export const updateWidgetSuccess = createAction(
  '[Editor] Update Widget Success',
  props<{ update: Update<Widget> }>()
);

export const updateWidgetFail = createAction('[Editor] Update Widget Fail');
