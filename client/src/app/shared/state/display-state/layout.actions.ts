import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Layout } from '../../models/layout.model';

export const loadLayouts = createAction('[Root/API] Load Layouts');
export const loadLayoutsSuccess = createAction(
  '[Root/API] Load Layouts Success',
  props<{ layouts: Layout[] }>()
);
export const loadLayoutsFail = createAction('[Root/API] Load Layouts Fail');

export const deleteLayout = createAction(
  '[Editor] Delete Layout',
  props<{ id: number }>()
);
export const deleteLayoutSuccess = createAction(
  '[Editor] Delete Layout Success',
  props<{ id: number }>()
);
export const deleteLayoutFail = createAction('[Editor] Delete Layout Fail');

export const selectLayout = createAction(
  '[Dashboard/Editor] Select Current Layout',
  props<{ id: number }>()
);

export const fetchLayout = createAction(
  '[Editor] Fetch layout by id',
  props<{ id: number }>()
);

export const fetchLayoutSuccess = createAction(
  '[Editor] Fetch layout by id Success',
  props<{ layout: Layout }>()
);

export const fetchLayoutFail = createAction('[Editor] Fetch layout by id Fail');

export const updateLayout = createAction(
  '[Editor] Update Layout',
  props<{ update: Update<Layout> }>()
);

export const updateLayoutSuccess = createAction(
  '[Editor] Update Layout Success',
  props<{ update: Update<Layout> }>()
);

export const updateLayoutFail = createAction('[Editor] Update Layout Fail');
