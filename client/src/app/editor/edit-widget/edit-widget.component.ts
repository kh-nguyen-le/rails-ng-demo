import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ConfigService } from '../../shared/config.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CableService } from '../../shared/cable.service';
import { Subscription } from 'rxjs';
import { Widget } from '../../shared/models/widget.model';

@Component({
  selector: 'app-edit-widget',
  templateUrl: './edit-widget.component.html',
  styleUrls: ['./edit-widget.component.css'],
})
export class EditWidgetComponent implements OnInit, OnDestroy {
  widget: Widget;
  form: FormGroup;
  results: FormControl;
  id: number;
  private sub: Subscription;
  private nav: Subscription;
  synchro: ActionCable.Channel;

  constructor(
    fb: FormBuilder,
    private conf: ConfigService,
    public snackBar: MatSnackBar,
    private router: Router,
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
    this.nav = this.router.events.subscribe((e: unknown) => {
      if (e instanceof NavigationEnd) {
        this.init();
      }
    });
  }

  onSubmit(): void {
    this.conf.updateWidget(this.id, this.form.value).subscribe(() => {
      this.snackBar.open('Primary Attributes updated', '', {
        duration: 2000,
      });
      this.sendUpdate();
    });
  }

  submitData(): void {
    const widget: Widget = {
      id: this.id,
      name: this.form.value.name,
      config: this.form.value.config,
      results: JSON.parse(this.results.value),
    };
    this.conf.updateWidget(this.id, widget).subscribe(() => {
      this.snackBar.open('Data Entered', '', {
        duration: 2000,
      });
      this.sendUpdate();
    });
  }

  init(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.conf.getWidgetById(this.id).subscribe((res) => {
        this.widget = res;
        this.form.patchValue({
          name: this.widget.name,
          config: this.widget.config,
        });
        this.results.patchValue(JSON.stringify(this.widget.results));
      });
    });
  }

  sendUpdate(): void {
    this.conf.getWidgetById(this.id).subscribe((res) => {
      this.synchro.send(res);
    });
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
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.nav.unsubscribe();
  }
}
