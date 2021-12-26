import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';
import { Layout } from './shared/models/layout.model';
import { AppState } from './shared/state';
import { LayoutActions, LayoutSelectors } from './shared/state/display-state';

@Injectable({
  providedIn: 'root',
})
export class LayoutResolver implements Resolve<Layout> {
  constructor(private store: Store<AppState>) {}

  resolve(): Observable<Layout> {
    return this.store.pipe(select(LayoutSelectors.selectLayout),
    tap((layout: Layout) => {
      if (!layout.grids) {
        this.store.dispatch(LayoutActions.fetchLayout({id: layout.id}))
      }
    }),
    filter((layout: Layout) => !!layout),
    first());
  }
}
