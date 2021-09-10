import { EntityState } from '@ngrx/entity';
import { Grid } from '../../models/grid.model';

export interface State extends EntityState<Grid> {
  selectedGridId: number | string | null;
}