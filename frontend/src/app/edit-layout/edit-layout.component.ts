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
  private nav: any;

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
      position: this.layout.grids.length,
      layout_id: this.layout.id,
      grid_id: this.new_grid
    }).subscribe( () => {
      this.router.navigate(['/layouts', this.id]);
    }
    );
  }

  async removeGrid(index: any) {
    for (let lg of this.layout.layout_grids) {
      if (lg.position == index) {
        await this.http.delete(`http://localhost:3000/layout_grids/${lg.id}`).subscribe();
      }
      else if (lg.position > index) {
        await this.http.put(`http://localhost:3000/layout_grids/${lg.id}`, {position: lg.position - 1}).subscribe();
      }
    }
    this.router.navigate(['/layouts', this.id]);
  }

  async shiftGridUp(index: any) {
    for (let lg of this.layout.layout_grids) {
      if (lg.position == index) {
        await this.http.put(`http://localhost:3000/layout_grids/${lg.id}`, {position: lg.position - 1}).subscribe();
      }
      else if (lg.position == index - 1) {
        await this.http.put(`http://localhost:3000/layout_grids/${lg.id}`, {position: lg.position + 1}).subscribe();
      }
      this.router.navigate(['/layouts', this.id]);
    }
  }

  async shiftGridDown(index: any) {
    for (let lg of this.layout.layout_grids) {
      if (lg.position == index) {
        await this.http.put(`http://localhost:3000/layout_grids/${lg.id}`, {position: lg.position + 1}).subscribe();
      }
      else if (lg.position == index + 1) {
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
    
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.nav.unsubscribe();
  }

}
