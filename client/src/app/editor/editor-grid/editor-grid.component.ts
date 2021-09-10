import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Grid } from '../../shared/models/grid.model';
import { Store } from '@ngrx/store';
import {
  GridActions,
  GridSelectors,
  GridState,
} from 'src/app/shared/state/display-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-editor-grid',
  templateUrl: './editor-grid.component.html',
  styleUrls: ['./editor-grid.component.css'],
})
export class EditorGridComponent implements OnInit {
  grids$: Observable<Grid[]>;

  constructor(
    private titleService: Title,
    private store: Store<GridState.State>
  ) {
    this.titleService.setTitle('Editor - Grids');
  }

  deleteGrid(id: number): void {
    this.store.dispatch(GridActions.deleteGrid({ id }));
  }

  getGrids(): void {
    this.store.dispatch(GridActions.loadGrids());
  }

  ngOnInit(): void {
    this.grids$ = this.store.select(GridSelectors.selectAllGrids);
    this.getGrids();
  }
}
