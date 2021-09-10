import { EntityState } from '@ngrx/entity';
import { Widget } from '../../models/widget.model';

export interface State extends EntityState<Widget> {
  selectedWidgetId: number | string | null;
}