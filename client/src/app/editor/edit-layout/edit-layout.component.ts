import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Grid } from '../../shared/models/grid.model';
import { Layout } from '../../shared/models/layout.model';
import { LayoutGrid } from '../../shared/models/layoutgrid.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/state';
import { Title } from '@angular/platform-browser';
import { map, takeWhile } from 'rxjs/operators';
import {
  GridActions,
  GridSelectors,
  LayoutActions,
  LayoutSelectors,
} from 'src/app/shared/state/display-state';
import { CableActions, CreateActions } from 'src/app/shared/state/editor-state';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'app-edit-layout',
  templateUrl: './edit-layout.component.html',
  styleUrls: ['./edit-layout.component.css'],
})
export class EditLayoutComponent implements OnInit, OnDestroy {
  @Input()
  layout$: Observable<Layout>;
  @Input()
  grids$: Observable<Grid[]>;
  layout: Layout;
  new_grid: number;
  targetLG: LayoutGrid;
  form: FormGroup;
  id: number;
  private sub: Subscription;
  selector: Subscription;
  allGrids$: Observable<Grid[]>;
  selector2: Subscription;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private titleService: Title
  ) {
    this.form = fb.group({
      name: ['', Validators.required],
      background: '',
      duration: [0, Validators.min(0)],
    });
    this.sub = this.route.params
      .pipe(
        map((params) => {
          this.id = +params.id;
          return LayoutActions.selectLayout({ id: params.id });
        })
      )
      .subscribe((action) => this.store.dispatch(action));
    this.titleService.setTitle('Editor - Layouts');
  }

  addGrid(): void {
    if (!this.new_grid) {
      return;
    }
    this.targetLG = {
      position: this.layout.grids.length,
      layout_id: this.layout.id,
      grid_id: this.new_grid,
      id: null,
    };
    this.store.dispatch(
      CreateActions.createLayoutGrid({ layoutgrid: this.targetLG })
    );
    this.update();
  }

  removeGrid(index: number): void {
    for (const lg of this.layout.layout_grids) {
      if (lg.position === index) {
        this.store.dispatch(CreateActions.deleteLayoutGrid({ layoutgrid: lg }));
      } else if (lg.position > index) {
        this.targetLG = {
          position: lg.position - 1,
          layout_id: lg.layout_id,
          grid_id: lg.grid_id,
          id: lg.id,
        };
        this.store.dispatch(
          CreateActions.updateLayoutGrid({ layoutgrid: this.targetLG })
        );
      }
    }
    this.update();
  }

  shiftGridUp(index: number): void {
    for (const lg of this.layout.layout_grids) {
      this.targetLG = {
        position: lg.position,
        layout_id: lg.layout_id,
        grid_id: lg.grid_id,
        id: lg.id,
      };
      if (lg.position === index) {
        this.targetLG.position -= 1;
      } else if (lg.position === index - 1) {
        this.targetLG.position += 1;
      } else {
        continue;
      }
      this.store.dispatch(
        CreateActions.updateLayoutGrid({ layoutgrid: this.targetLG })
      );
    }
    this.update();
  }

  shiftGridDown(index: number): void {
    for (const lg of this.layout.layout_grids) {
      this.targetLG = {
        position: lg.position,
        layout_id: lg.layout_id,
        grid_id: lg.grid_id,
        id: lg.id,
      };
      if (lg.position === index) {
        this.targetLG.position += 1;
      } else if (lg.position === index + 1) {
        this.targetLG.position -= 1;
      } else {
        continue;
      }
      this.store.dispatch(
        CreateActions.updateLayoutGrid({ layoutgrid: this.targetLG })
      );
    }
    this.update();
  }

  onSubmit(): void {
    const update: Update<Layout> = {
      id: this.layout.id,
      changes: this.form.value,
    };
    this.store.dispatch(LayoutActions.updateLayout({ update: update }));
    this.update();
  }

  update(): void {
    const layout: Layout = {
      kind: 'layout',
      id: this.layout.id,
      name: this.layout.name,
      background: this.layout.background,
      duration: this.layout.duration,
      grids: this.layout.grids,
      layout_grids: this.layout.layout_grids,
    };
    this.store.dispatch(CableActions.sendLayout({ layout: layout }));
  }

  ngOnInit(): void {
    this.layout$ = this.store.select(LayoutSelectors.selectCurrentLayout);
    this.store.dispatch(LayoutActions.fetchLayout({ id: this.id }));
    this.selector = this.layout$
      .pipe(takeWhile((layout) => layout !== null))
      .subscribe((data) => (this.layout = data));

    this.form.patchValue({
      name: this.layout.name,
      background: this.layout.background,
      duration: this.layout.duration,
    });

    this.grids$ = this.store.select(LayoutSelectors.getSubGrids);
    this.allGrids$ = this.store.select(GridSelectors.selectAllGrids);
    this.store.dispatch(GridActions.loadGrids());
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.selector.unsubscribe();
  }
}
