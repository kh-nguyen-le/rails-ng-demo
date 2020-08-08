import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ConfigService, Grid, Widget, GridWidget } from '../../config.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CableService } from '../../cable.service';
@Component({
  selector: 'app-edit-grid',
  templateUrl: './edit-grid.component.html',
  styleUrls: ['./edit-grid.component.css'],
})
export class EditGridComponent implements OnInit, OnDestroy {
  grid: Grid;
  widgets: Widget[];
  new_widget: number;
  targetGW: GridWidget;
  form: FormGroup;
  id: number;
  private sub: any;
  private nav: any;
  synchro: ActionCable.Channel;

  constructor(
    fb: FormBuilder,
    private conf: ConfigService,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private router: Router,
    private cs: CableService
  ) {
    this.form = fb.group({
      name: '',
      title: '',
      col: '',
      size: '',
    });
    this.nav = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.init();
      }
    });
  }

  addWidget() {
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
    this.conf.createGridWidget(this.targetGW).subscribe(() => {
      this.update();
    });
  }

  async removeWidget(index: number) {
    for (const gw of this.grid.grid_widgets) {
      if (gw.position === index) {
        await this.conf.deleteGridWidget(gw.id).toPromise();
      } else if (gw.position > index) {
        this.targetGW = {
          position: gw.position - 1,
          grid_id: gw.grid_id,
          widget_id: gw.widget_id,
          length: gw.length,
          width: gw.width,
          id: gw.id,
        };
        await this.conf.updateGridWidget(this.targetGW).toPromise();
      }
    }
    this.update();
  }

  async shiftWidgetUp(index: number) {
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
      }
      await this.conf.updateGridWidget(this.targetGW).toPromise();
    }
    this.update();
  }

  async shiftWidgetDown(index: number) {
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
      }
      await this.conf.updateGridWidget(this.targetGW).toPromise();
    }
    this.update();
  }

  onSubmit() {
    this.conf.updateGrid(this.id, this.form.value).subscribe((res) => {
      this.snackBar.open('Primary Attributes updated', '', {
        duration: 2000,
      });
    });
  }

  init() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.conf.getGridById(this.id).subscribe((res) => {
        this.grid = res;
        this.form.patchValue({
          name: this.grid.name,
          title: this.grid.title,
          col: this.grid.col,
          size: this.grid.size,
        });
      });
    });
    this.conf.getWidgets().subscribe((res) => (this.widgets = res));
  }

  update() {
    this.conf.getGridById(this.id).subscribe((res) => {
      this.grid = res;
      this.synchro.send(res);
    });
    this.router.navigate(['/grids', this.id]);
  }

  newSynchro() {
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

  ngOnInit() {
    this.newSynchro();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.nav.unsubscribe();
  }
}
