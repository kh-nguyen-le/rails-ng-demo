import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { Widget } from '../../shared/models/widget.model';
import {
  WidgetActions,
  WidgetSelectors,
} from 'src/app/shared/state/display-state';
import { AppState } from 'src/app/shared/state';
import { Store } from '@ngrx/store';
import { map, takeWhile } from 'rxjs/operators';
import { Update } from '@ngrx/entity';
import { CableActions } from 'src/app/shared/state/editor-state';

@Component({
  selector: 'app-edit-widget',
  templateUrl: './edit-widget.component.html',
  styleUrls: ['./edit-widget.component.css'],
})
export class EditWidgetComponent implements OnInit, OnDestroy {
  widget$: Observable<Widget>;
  form: FormGroup;
  results: FormControl;
  id: number;
  private sub: Subscription;
  private selector: Subscription;

  constructor(
    fb: FormBuilder,
    public snackBar: MatSnackBar,
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.form = fb.group({
      name: ['', Validators.required],
      config: fb.group({
        widgetType: ['', Validators.required],
        gradient: false,
        showXAxis: false,
        showYAxis: false,
        showLegend: false,
        showXAxisLabel: false,
        showYAxisLabel: false,
        xAxisLabel: 'x-axis',
        yAxisLabel: 'y-axis',
        autoScale: false,
      }),
    });
    this.results = fb.control('');
    this.sub = this.route.params
      .pipe(
        map((params) => {
          this.id = +params.id;
          return WidgetActions.selectWidget({ id: this.id });
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  onSubmit(): void {
    const widget: Widget = {
      kind: 'widget',
      id: this.id,
      name: this.form.value.name,
      config: this.form.value.config,
      results: JSON.parse(this.results.value),
    };
    const update: Update<Widget> = {
      id: this.id,
      changes: this.form.value,
    };

    this.store.dispatch(WidgetActions.updateWidget({ update: update }));
    this.sendUpdate(widget);
  }

  submitData(): void {
    const widget: Widget = {
      kind: 'widget',
      id: this.id,
      name: this.form.value.name,
      config: this.form.value.config,
      results: JSON.parse(this.results.value),
    };
    const update: Update<Widget> = {
      id: widget.id,
      changes: widget,
    };
    this.store.dispatch(WidgetActions.updateWidget({ update: update }));
    this.sendUpdate(widget);
  }

  sendUpdate(widget: Widget): void {
    this.store.dispatch(CableActions.sendWidget({ widget: widget }));
  }

  ngOnInit(): void {
    this.widget$ = this.store.select(WidgetSelectors.selectCurrentWidget);
    this.store.dispatch(WidgetActions.fetchWidget({ id: this.id }));
    this.selector = this.widget$
      .pipe(takeWhile((widget) => widget !== null))
      .subscribe((data) => {
        this.form.patchValue({ name: data.name, config: data.config });
        this.results.patchValue(JSON.stringify(data.results));
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.selector.unsubscribe();
  }
}
