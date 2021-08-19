import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';
import { Layout } from './shared/models/layout.model';
import { Store } from '@ngrx/store';
import { AppState } from './shared/state/';
import { Observable } from 'rxjs';
import { LayoutActions, LayoutSelectors } from './shared/state/display-state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  layouts$: Observable<Layout[]>;
  apiUrl = environment.apiUrl;

  constructor(public titleService: Title, private store: Store<AppState>) {
    this.titleService.setTitle('rails-ng demo');
  }

  getLayouts(): void {
    this.store.dispatch(LayoutActions.loadLayouts());
  }

  ngOnInit(): void {
    this.layouts$ = this.store.select(LayoutSelectors.selectAllLayouts);
    this.getLayouts();
  }
}
