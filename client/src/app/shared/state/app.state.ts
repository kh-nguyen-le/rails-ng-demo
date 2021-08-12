import { EntityState } from '@ngrx/entity';
import { Layout } from '../models/layout.model';

export interface LayoutState extends EntityState<Layout> {
  selectedLayoutId: number | string | null;
}

export interface AppState {
  layoutState: LayoutState;
}
