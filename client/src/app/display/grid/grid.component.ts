import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
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
  channel: ActionCable.Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(GridActions.selectGrid({ id: this.grid.id }));
    this.store.dispatch(GridActions.fetchGrid({ id: this.grid.id }));
    this.widgets$ = this.store.select(GridSelectors.getSubWidgets);
  }
}
