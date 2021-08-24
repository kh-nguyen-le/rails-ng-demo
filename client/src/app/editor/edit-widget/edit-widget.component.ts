import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ConfigService } from '../../shared/config.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CableService } from '../../shared/cable.service';
import { Observable, Subscription } from 'rxjs';
import { Widget } from '../../shared/models/widget.model';
import {
  WidgetActions,
  WidgetSelectors,
} from 'src/app/shared/state/display-state';
import { AppState } from 'src/app/shared/state';
import { Store } from '@ngrx/store';
import { map, takeWhile } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { Update } from '@ngrx/entity';

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
  synchro: ActionCable.Channel;

  constructor(
    fb: FormBuilder,
    private conf: ConfigService,
    public snackBar: MatSnackBar,
    private router: Router,
    private store: Store<AppState>,
    private titleService: Title,
    private route: ActivatedRoute,
    private cs: CableService
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
          this.id = params.id;
          return WidgetActions.selectWidget({ id: this.id });
        })
      )
      .subscribe((action) => this.store.dispatch(action));
    this.titleService.setTitle('Editor - Widgets');
  }

  onSubmit(): void {
    const update: Update<Widget> = {
      id: this.id,
      changes: this.form.value,
    };

    this.store.dispatch(WidgetActions.updateWidget({ update: update }));
  }

  submitData(): void {
    const widget: Widget = {
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
  }

  sendUpdate(): void {
    // this.conf.getWidgetById(this.id).subscribe((res) => {
    //   this.synchro.send(res);
    // });
  }

  newSynchro(): void {
    if (this.synchro != null) {
      this.synchro.unsubscribe();
    }
    this.synchro = this.cs.joinSynchroChannel('widget', this.id, {
      connected() {
        return console.log(`widget: Connected.`);
      },
      disconnected() {
        return console.log(`widget: Disconnected.`);
      },
    });
  }

  ngOnInit(): void {
    this.newSynchro();
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
