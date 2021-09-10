import { createAction, props } from '@ngrx/store';
import { Grid } from '../../models/grid.model';
import { Layout } from '../../models/layout.model';
import { Widget } from '../../models/widget.model';

export const connect = createAction('[Root] Connect to ActionCable');

export const sendLayout = createAction('[Editor] Send updated layout', props<{layout: Layout }>())

export const sendGrid = createAction('[Editor] Send updated grid', props<{grid: Grid }>())

export const sendWidget = createAction('[Editor] Send updated widget', props<{widget: Widget }>())