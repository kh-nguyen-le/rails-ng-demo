import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-layout',
  templateUrl: './edit-layout.component.html',
  styleUrls: ['./edit-layout.component.css']
})
export class EditLayoutComponent implements OnInit, OnDestroy {

  layout;
  new_grid;
  grids;
  form: FormGroup;
  id: Number;
  private sub: any;
  nav;

  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private router: Router) {
      this.form = fb.group({
        name: '',
        background: '',
      });
    this.nav = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.init();
      }
    })
  }

  addGrid() {
    if (!this.new_grid) return;
    this.http.post('http://localhost:3000/layout_grids', {
      position: this.layout.grids.length + 1,
      layout_id: this.layout.id,
      grid_id: this.new_grid
    }).subscribe( res => {
      this.router.navigate(['/layouts', this.id]);
    }
    );
  }

  async removeGrid(id: Number) {
    let pos = 0;
    for (let lg of this.layout.layout_grids) {
      if (lg.grid_id == id) {
        pos = lg.position;
        await this.http.delete(`http://localhost:3000/layout_grids/${lg.id}`).subscribe();
      }
      else if (lg.position > pos) {
        await this.http.put(`http://localhost:3000/layout_grids/${lg.id}`, {position: lg.position - 1}).subscribe();
      }
    }
    this.router.navigate(['/layouts', this.id]);
  }

  onSubmit(){
    this.http.put(`http://localhost:3000/layouts/${this.id}`, this.form.value)
      .subscribe(res => { 
        this.snackBar.open('Name and Background updated', '', {
          duration: 2000
        });
        }
      );
   }

  init() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.http.get(`http://localhost:3000/layouts/${this.id}`)
        .subscribe(res => {
          this.layout = res;
          this.form.patchValue({
            name: this.layout.name,
            background: this.layout.background,
          });
        });
    });
    this.http.get('http://localhost:3000/grids')
      .subscribe(res => this.grids = res);
  }

  ngOnInit() {
    this.init();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.nav.unsubscribe();
  }

}
