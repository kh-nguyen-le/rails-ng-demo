import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-grid',
  templateUrl: './edit-grid.component.html',
  styleUrls: ['./edit-grid.component.css']
})
export class EditGridComponent implements OnInit {

  grid;
  widgets;
  new_widget;
  form: FormGroup;
  id: Number;
  private sub: any;
  private nav: any;

  constructor(fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private router: Router) {
    this.form = fb.group({
      name: '',
      title: '',
      col: '',
      size: ''
    });
    this.nav = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.init();
      }
    })
   }

   addWidget() {
    if (!this.new_widget) return;
    this.http.post('http://localhost:3000/grid_widgets', {
      position: this.grid.widgets.length,
      grid_id: this.grid.id,
      widget_id: this.new_widget
    }).subscribe( () => {
      this.router.navigate(['/grids', this.id]);
    }
    );
  }

  async removeWidget(index: any) {
    for (let gw of this.grid.grid_widgets) {
      if (gw.position == index) {
        await this.http.delete(`http://localhost:3000/grid_widgets/${gw.id}`).subscribe();
      }
      else if (gw.position > index) {
        await this.http.put(`http://localhost:3000/grid_widgets/${gw.id}`, {position: gw.position - 1}).subscribe();
      }
    }
    this.router.navigate(['/grids', this.id]);
  }

  async shiftWidgetUp(index: any) {
    for (let gw of this.grid.grid_widgets) {
      if (gw.position == index) {
        await this.http.put(`http://localhost:3000/grid_widgets/${gw.id}`, {position: gw.position - 1}).subscribe();
      }
      else if (gw.position == (index - 1)) {
        await this.http.put(`http://localhost:3000/grid_widgets/${gw.id}`, {position: gw.position + 1}).subscribe();
      }
    }
    this.router.navigate(['/grids', this.id]);
  }

  async shiftWidgetDown(index: any) {
    for (let gw of this.grid.grid_widgets) {
      if (gw.position == index) {
        await this.http.put(`http://localhost:3000/grid_widgets/${gw.id}`, {position: gw.position + 1}).subscribe();
      }
      else if (gw.position == index + 1) {
        await this.http.put(`http://localhost:3000/grid_widgets/${gw.id}`, {position: gw.position - 1}).subscribe();
      }
    }
    this.router.navigate(['/grids', this.id]);
  }

  onSubmit(){
    this.http.put(`http://localhost:3000/grids/${this.id}`, this.form.value)
      .subscribe(res => { 
        this.snackBar.open('Primary Attributes updated', '', {
          duration: 2000
        });
        }
      );
   }

  init() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.http.get(`http://localhost:3000/grids/${this.id}`)
        .subscribe(res => {
          this.grid = res;
          this.form.patchValue({
            name: this.grid.name,
            title: this.grid.title,
            col: this.grid.col,
            size: this.grid.size
          });
        });
    });
    this.http.get('http://localhost:3000/widgets')
      .subscribe(res => this.widgets = res);
  }

  ngOnInit() {
  }

}
