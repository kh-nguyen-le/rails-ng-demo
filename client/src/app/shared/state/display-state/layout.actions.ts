import { createAction, props } from '@ngrx/store';
import { Layout } from '../../models/layout.model';

export const loadLayouts = createAction('[Root/API] Load Layouts');
export const loadLayoutsSuccess = createAction(
  '[Root/API] Load Layouts Success',
  props<{ layouts: Layout[] }>()
);
export const loadLayoutsFail = createAction('[Root/API] Load Layouts Fail');
