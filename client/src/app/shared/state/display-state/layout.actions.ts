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
