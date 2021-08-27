import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CableService } from '../../shared/cable.service';
import { Grid } from '../../shared/models/grid.model';
import { Widget } from '../../shared/models/widget.model';
import { AppState } from 'src/app/shared/state';
import { Store } from '@ngrx/store';
import { GridActions, GridSelectors } from 'src/app/shared/state/display-state';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent implements OnInit {
  @Input() grid: Grid;
  widgets$: Observable<Widget[]>;
  channel: ActionCable.Channel;

  constructor(
    private store: Store<AppState>,
    private cs: CableService,
    private cd: ChangeDetectorRef
  ) {}

  async getData(): Promise<void> {
    this.newChannel();
  }

  newChannel(): void {
    if (this.channel != null) {
      this.channel.unsubscribe();
    }
    this.channel = this.cs.joinSynchroChannel('grid', this.grid.id, {
      connected() {
        return console.log(`grid: Connected.`);
      },
      disconnected() {
        return console.log(`grid: Disconnected.`);
      },
      received: (data: Grid) => this.refresh(data),
    });
  }

  refresh(data: Grid): void {
    console.log('New grid received. Updating.');
    this.grid = data;
    this.widgets$ = of(data.widgets);
    this.cd.detectChanges();
  }

  ngOnInit(): void {
    this.store.dispatch(GridActions.selectGrid({ id: this.grid.id }));
    this.store.dispatch(GridActions.fetchGrid({ id: this.grid.id }));
    this.getData();
    this.widgets$ = this.store.select(GridSelectors.getSubWidgets);
  }
}
