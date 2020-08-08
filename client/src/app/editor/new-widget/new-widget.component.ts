import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfigService } from '../../config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-widget',
  templateUrl: './new-widget.component.html',
  styleUrls: ['./new-widget.component.css'],
})
export class NewWidgetComponent {
  form: FormGroup;
  new_id;

  constructor(
    fb: FormBuilder,
    private conf: ConfigService,
    private router: Router
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
  }

  onSubmit(): void {
    this.conf.createWidget(this.form.value).subscribe((res) => {
      this.new_id = res;
      this.router.navigate(['/widgets', this.new_id.id]);
    });
  }
}
