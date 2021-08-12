import { Component, OnInit } from '@angular/core';
import { ConfigService } from './shared/config.service';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';
import { Layout } from './shared/models/layout.model';
import { Store } from '@ngrx/store';
import { LayoutState } from './shared/state/app.state';
import * as fromActions from './shared/state/app.actions';
import * as fromReducer from './shared/state/app.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  layouts$: Observable<Layout[]>;
  apiUrl = environment.apiUrl;

  constructor(
    private conf: ConfigService,
    public titleService: Title,
    private store: Store<LayoutState>,
    ) {
    this.titleService.setTitle('rails-ng demo');
  }

  getLayouts(): void {
    this.store.dispatch(fromActions.loadLayouts());
  }

  ngOnInit(): void {
    this.layouts$ = this.store.select(fromReducer.selectAllLayouts);
    this.getLayouts();
  }
}
