import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Widget } from '../../shared/models/widget.model';
import { Store } from '@ngrx/store';
import { WidgetState } from '../../shared/state/display-state';
import { CreateActions } from '../../shared/state/editor-state';

@Component({
  selector: 'app-new-widget',
  templateUrl: './new-widget.component.html',
  styleUrls: ['./new-widget.component.css'],
})
export class NewWidgetComponent {
  form: FormGroup;
  widget: Widget;

  constructor(fb: FormBuilder, private store: Store<WidgetState.State>) {
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
  }

  onSubmit(): void {
    this.widget = this.form.value;
    this.store.dispatch(CreateActions.createWidget({ widget: this.widget }));
  }
}
