import { EntityState } from '@ngrx/entity';
import { Layout } from '../../models/layout.model';

export interface State extends EntityState<Layout> {
  selectedLayoutId: number | string | null;
}