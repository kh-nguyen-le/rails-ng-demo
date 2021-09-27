import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  DoCheck,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { iif, interval, Observable, Subscription } from 'rxjs';
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
export class DashComponent implements OnInit, OnDestroy, DoCheck {
  layout: Layout;
  layout$: Observable<Layout>;
  grids$: Observable<Grid[]>;
  stop$: Observable<boolean>;
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
    if (!this.index) this.index = 0;
  }

  getData(): void {
    this.grids$ = this.store.select(LayoutSelectors.getSubGrids);
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = this.layout.background;
  }

  setCycle(): void {
    const source = iif(
      () => this.layout.duration > 0,
      interval(this.layout.duration)
    );
    this.timer = source.subscribe(
      () => (this.index = (this.index + 1) % this.layout.grids.length)
    );
  }

  ngDoCheck(): void {
    if (this.timer) {
      this.timer.unsubscribe();
      this.getData();
      this.setCycle();
    }
  }

  ngOnInit(): void {
    this.selector = this.layout$.subscribe((data) => (this.layout = data));
    this.getData();
    this.setCycle();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.selector.unsubscribe();
  }
}
