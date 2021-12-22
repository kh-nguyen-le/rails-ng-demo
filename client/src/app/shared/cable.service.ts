import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as ActionCable from '@rails/actioncable';
import { DisplayObject } from './models/displayobject.model';
import { Store } from '@ngrx/store';
import { AppState } from './state';
import { fetchGrid } from './state/display-state/grid.actions';
import { GridSelectors, LayoutSelectors } from './state/display-state';
import { first } from 'rxjs/operators';
import { Grid } from './models/grid.model';
import { fetchWidget } from './state/display-state/widget.actions';
import { fetchLayout } from './state/display-state/layout.actions';
import { Layout } from './models/layout.model';

@Injectable({
  providedIn: 'root',
})
export class CableService {
  sockUrl = environment.sockUrl;
  cable: ActionCable.Consumer = ActionCable.createConsumer(environment.sockUrl);
  channel: ActionCable.Subscription;

  joinSynchro(): void {
    this.channel = this.cable.subscriptions.create('SynchroChannel', {
      connected() {
        return ActionCable.logger.log('Synchro connected');
      },
      disconnected() {
        return ActionCable.logger.log('Synchro disconnected');
      },
      rejected() {
        return ActionCable.logger.log('Synchro rejected');
      },
      received: (data: DisplayObject) => {
        const grid$ = this.store.select(GridSelectors.selectCurrentGrid);
        let current_grid: Grid;
        grid$.pipe(first()).subscribe((data) => {
          current_grid = data;
        });
        const layout$ = this.store.select(LayoutSelectors.selectCurrentLayout);
        let current_layout: Layout;
        layout$.pipe(first()).subscribe((data) => {
          current_layout = data;
        });
        switch (data.kind) {
          case 'layout':
            if (data.id == current_layout.id) {
              ActionCable.logger.log('received layout');
              for (const grid of data.grids) {
                this.store.dispatch(fetchGrid({ id: grid.id }));
              }
              this.store.dispatch(fetchLayout({ id: data.id }));
            }
            break;
          case 'grid':
            if (data.id == current_grid.id) {
              ActionCable.logger.log('received grid');
              this.store.dispatch(fetchGrid({ id: current_grid.id }));
            }
            break;
          case 'widget':
            for (const widget of current_grid.widgets) {
              if (widget.id == data.id) {
                ActionCable.logger.log('received widget');
                this.store.dispatch(fetchGrid({ id: current_grid.id }));
                this.store.dispatch(fetchWidget({ id: data.id }));
              }
            }
            break;
          default:
            ActionCable.logger.log('default');
            break;
        }
      },
    });
  }

  log(message: string): void {
    ActionCable.logger.log(message);
  }
  constructor(private store: Store<AppState>) {
    ActionCable.logger.enabled = true;
  }
}
