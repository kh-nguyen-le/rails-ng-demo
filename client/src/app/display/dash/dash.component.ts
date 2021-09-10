import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval, Observable, Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { Grid } from '../../shared/models/grid.model';
import { Layout } from '../../shared/models/layout.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/state';
import {
  LayoutActions,
  LayoutSelectors,
} from 'src/app/shared/state/display-state';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css'],
})
export class DashComponent implements OnInit, OnDestroy {
  layout: Layout;
  layout$: Observable<Layout>;
  grids$: Observable<Grid[]>;
  private sub: Subscription;
  private timer: Subscription;
  private selector: Subscription;
  index: number;
  id: number;

  constructor(
    private store: Store<AppState>,
    private titleService: Title,
    private elementRef: ElementRef,
    private route: ActivatedRoute
  ) {
    this.titleService.setTitle('Dashboard');
    this.sub = this.route.params
      .pipe(
        map((params) => {
          this.id = +params.id;
          return LayoutActions.selectLayout({ id: params.id });
        })
      )
      .subscribe((action) => this.store.dispatch(action));
    this.layout$ = this.store.select(LayoutSelectors.selectCurrentLayout);
  }

  getData(): void {
    this.grids$ = this.store.select(LayoutSelectors.getSubGrids);
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = this.layout.background;
    this.index = 0;
    if (this.layout.duration) {
      const source = interval(this.layout.duration);
      this.timer = source.subscribe(
        () => (this.index = (this.index + 1) % this.layout.grids.length)
      );
    } else if (this.timer != null) {
      this.timer.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.selector = this.layout$.subscribe((data) => (this.layout = data));
    this.getData();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.selector.unsubscribe();
  }
}
