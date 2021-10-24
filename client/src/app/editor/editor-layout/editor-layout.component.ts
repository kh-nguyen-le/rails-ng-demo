import { Component, OnInit } from '@angular/core';
import { Layout } from '../../shared/models/layout.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  LayoutActions,
  LayoutSelectors,
  LayoutState,
} from 'src/app/shared/state/display-state';

@Component({
  selector: 'app-editor-layout',
  templateUrl: './editor-layout.component.html',
  styleUrls: ['./editor-layout.component.css'],
})
export class EditorLayoutComponent implements OnInit {
  layouts$: Observable<Layout[]>;

  constructor(private store: Store<LayoutState.State>) {}

  deleteLayout(id: number): void {
    this.store.dispatch(LayoutActions.deleteLayout({ id }));
  }

  getLayouts(): void {
    this.store.dispatch(LayoutActions.loadLayouts());
  }

  ngOnInit(): void {
    this.layouts$ = this.store.select(LayoutSelectors.selectAllLayouts);
    this.getLayouts();
  }
}
