import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as ActionCable from '@rails/actioncable';
import { DisplayObject } from './models/displayobject.model';
import { Store } from '@ngrx/store';
import { AppState } from './state';
import { fetchGrid } from './state/display-state/grid.actions';
import { GridSelectors } from './state/display-state';
import { first } from 'rxjs/operators';

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
        const id$ = this.store.select(GridSelectors.getSelectedGridId);
        let grid_id;
        id$.pipe(first()).subscribe(id => { grid_id = id });
        ActionCable.logger.log(grid_id);
        switch (data.kind) {
          case 'layout':
            for (const grid of data.grids) {
              if (grid.id == grid_id) {
                ActionCable.logger.log('received layout');
                this.store.dispatch(fetchGrid({ id: grid_id }));
              }
            }
            break;
          case 'grid':
            if (data.id == grid_id) {
              ActionCable.logger.log('received grid');
              this.store.dispatch(fetchGrid({ id: grid_id }));
            }
            break;
          case 'widget':
            for (const grid of data.grids) {
              if (grid.id == grid_id) {
                ActionCable.logger.log('received widget');
                this.store.dispatch(fetchGrid({ id: grid_id }));
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
