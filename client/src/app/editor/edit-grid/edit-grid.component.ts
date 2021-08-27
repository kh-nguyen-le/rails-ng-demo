import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CableService } from '../../shared/cable.service';
import { Observable, Subscription } from 'rxjs';
import { Grid } from '../../shared/models/grid.model';
import { GridWidget } from '../../shared/models/gridwidget.model';
import { Widget } from '../../shared/models/widget.model';
import { Title } from '@angular/platform-browser';
import {
  GridActions,
  GridSelectors,
  WidgetActions,
  WidgetSelectors,
} from 'src/app/shared/state/display-state';
import { AppState } from 'src/app/shared/state';
import { Store } from '@ngrx/store';
import { map, takeWhile } from 'rxjs/operators';
import { CreateActions } from 'src/app/shared/state/editor-state';
import { Update } from '@ngrx/entity';
@Component({
  selector: 'app-edit-grid',
  templateUrl: './edit-grid.component.html',
  styleUrls: ['./edit-grid.component.css'],
})
export class EditGridComponent implements OnInit, OnDestroy {
  grid: Grid;
  widgets$: Observable<Widget[]>;
  allWidgets$: Observable<Widget[]>;
  new_widget: number;
  targetGW: GridWidget;
  form: FormGroup;
  id: number;
  private sub: Subscription;
  private nav: Subscription;
  synchro: ActionCable.Channel;
  grid$: Observable<Grid>;
  selector: Subscription;

  constructor(
    fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private titleService: Title,
    private cs: CableService
  ) {
    this.form = fb.group({
      name: ['', Validators.required],
      title: '',
      col: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
      size: '',
    });
    this.sub = this.route.params
      .pipe(
        map((params) => {
          this.id = +params.id;
          return GridActions.selectGrid({ id: params.id });
        })
      )
      .subscribe((action) => this.store.dispatch(action));
    this.titleService.setTitle('Editor - Grids');
  }

  addWidget(): void {
    if (!this.new_widget) {
      return;
    }
    this.targetGW = {
      position: this.grid.widgets.length,
      grid_id: this.grid.id,
      widget_id: this.new_widget,
      length: null, // TODO: Implement custom widget length and width
      width: null,
      id: null,
    };
    this.store.dispatch(
      CreateActions.createGridWidget({ gridwidget: this.targetGW })
    );
    this.update();
  }

  async removeWidget(index: number): Promise<void> {
    for (const gw of this.grid.grid_widgets) {
      if (gw.position === index) {
        this.store.dispatch(CreateActions.deleteGridWidget({ gridwidget: gw }));
      } else if (gw.position > index) {
        this.targetGW = {
          position: gw.position - 1,
          grid_id: gw.grid_id,
          widget_id: gw.widget_id,
          length: gw.length,
          width: gw.width,
          id: gw.id,
        };
        this.store.dispatch(
          CreateActions.updateGridWidget({ gridwidget: this.targetGW })
        );
      }
    }
    this.update();
  }

  async shiftWidgetUp(index: number): Promise<void> {
    for (const gw of this.grid.grid_widgets) {
      this.targetGW = {
        position: gw.position,
        grid_id: gw.grid_id,
        widget_id: gw.widget_id,
        length: gw.length,
        width: gw.width,
        id: gw.id,
      };
      if (gw.position === index) {
        this.targetGW.position -= 1;
      } else if (gw.position === index - 1) {
        this.targetGW.position += 1;
      } else {
        continue;
      }
      this.store.dispatch(
        CreateActions.updateGridWidget({ gridwidget: this.targetGW })
      );
    }
    this.update();
  }

  async shiftWidgetDown(index: number): Promise<void> {
    for (const gw of this.grid.grid_widgets) {
      this.targetGW = {
        position: gw.position,
        grid_id: gw.grid_id,
        widget_id: gw.widget_id,
        length: gw.length,
        width: gw.width,
        id: gw.id,
      };
      if (gw.position === index) {
        this.targetGW.position += 1;
      } else if (gw.position === index + 1) {
        this.targetGW.position -= 1;
      } else {
        continue;
      }
      this.store.dispatch(
        CreateActions.updateGridWidget({ gridwidget: this.targetGW })
      );
    }
    this.update();
  }

  onSubmit(): void {
    const update: Update<Grid> = {
      id: this.id,
      changes: this.form.value,
    };
    this.store.dispatch(GridActions.updateGrid({ update: update }));
    this.synchro.send(this.grid);
  }

  update(): void {
    this.synchro.send(this.grid);
  }

  newSynchro(): void {
    if (this.synchro != null) {
      this.synchro.unsubscribe();
    }
    this.synchro = this.cs.joinSynchroChannel('grid', this.id, {
      connected() {
        return console.log(`grid: Connected.`);
      },
      disconnected() {
        return console.log(`grid: Disconnected.`);
      },
    });
  }

  ngOnInit(): void {
    this.newSynchro();
    this.grid$ = this.store.select(GridSelectors.selectCurrentGrid);
    this.store.dispatch(GridActions.fetchGrid({ id: this.id }));
    this.selector = this.grid$
      .pipe(takeWhile((grid) => grid !== null))
      .subscribe((data) => (this.grid = data));

    this.form.patchValue({
      name: this.grid.name,
      title: this.grid.title,
      col: this.grid.col,
      size: this.grid.size,
    });

    this.widgets$ = this.store.select(GridSelectors.getSubWidgets);
    this.allWidgets$ = this.store.select(WidgetSelectors.selectAllWidgets);
    this.store.dispatch(WidgetActions.loadWidgets());
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
