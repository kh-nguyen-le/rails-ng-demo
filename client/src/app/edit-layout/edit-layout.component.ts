import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-layout',
  templateUrl: './edit-layout.component.html',
  styleUrls: ['./edit-layout.component.css']
})
export class EditLayoutComponent implements OnInit, OnDestroy {

  apiUrl = environment.apiUrl;
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
        duration: ''
      });
    this.nav = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.init();
      }
    })
  }

  addGrid() {
    if (!this.new_grid) return;
    this.http.post(`${this.apiUrl}/layout_grids`, {
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
        await this.http.delete(`${this.apiUrl}/layout_grids/${lg.id}`).subscribe();
      }
      else if (lg.position > index) {
        await this.http.put(`${this.apiUrl}/layout_grids/${lg.id}`, {position: lg.position - 1}).subscribe();
      }
    }
    this.router.navigate(['/layouts', this.id]);
  }

  async shiftGridUp(index: any) {
    for (let lg of this.layout.layout_grids) {
      if (lg.position == index) {
        await this.http.put(`${this.apiUrl}/layout_grids/${lg.id}`, {position: lg.position - 1}).subscribe();
      }
      else if (lg.position == index - 1) {
        await this.http.put(`${this.apiUrl}/layout_grids/${lg.id}`, {position: lg.position + 1}).subscribe();
      }
      this.router.navigate(['/layouts', this.id]);
    }
  }

  async shiftGridDown(index: any) {
    for (let lg of this.layout.layout_grids) {
      if (lg.position == index) {
        await this.http.put(`${this.apiUrl}/layout_grids/${lg.id}`, {position: lg.position + 1}).subscribe();
      }
      else if (lg.position == index + 1) {
        await this.http.put(`${this.apiUrl}/layout_grids/${lg.id}`, {position: lg.position - 1}).subscribe();
      }
    }
    this.router.navigate(['/layouts', this.id]);
  }

  onSubmit(){
    this.http.put(`${this.apiUrl}/layouts/${this.id}`, this.form.value)
      .subscribe( () => { 
        this.snackBar.open('Primary Attributes updated', '', {
          duration: 2000
        });
        }
      );
   }

  init() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.http.get(`${this.apiUrl}/layouts/${this.id}`)
        .subscribe(res => {
          this.layout = res;
          this.form.patchValue({
            name: this.layout.name,
            background: this.layout.background,
            duration: this.layout.duration
          });
        });
    });
    this.http.get(`${this.apiUrl}/grids`)
      .subscribe(res => this.grids = res);
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.nav.unsubscribe();
  }

}
