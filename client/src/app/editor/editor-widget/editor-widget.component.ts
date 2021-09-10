import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Widget } from '../../shared/models/widget.model';
import { Store } from '@ngrx/store';
import {
  WidgetActions,
  WidgetSelectors,
  WidgetState,
} from 'src/app/shared/state/display-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-editor-widget',
  templateUrl: './editor-widget.component.html',
  styleUrls: ['./editor-widget.component.css'],
})
export class EditorWidgetComponent implements OnInit {
  widgets$: Observable<Widget[]>;

  constructor(
    private titleService: Title,
    private store: Store<WidgetState.State>
  ) {
    this.titleService.setTitle('Editor - Widgets');
  }

  deleteWidget(id: number): void {
    this.store.dispatch(WidgetActions.deleteWidget({ id }));
  }

  getWidgets(): void {
    this.store.dispatch(WidgetActions.loadWidgets());
  }
  ngOnInit(): void {
    this.widgets$ = this.store.select(WidgetSelectors.selectAllWidgets);
    this.getWidgets();
  }
}
