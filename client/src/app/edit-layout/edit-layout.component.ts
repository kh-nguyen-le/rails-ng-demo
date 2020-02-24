import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ConfigService, Layout, Grid, LayoutGrid } from '../config.service'
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-layout',
  templateUrl: './edit-layout.component.html',
  styleUrls: ['./edit-layout.component.css']
})
export class EditLayoutComponent implements OnInit, OnDestroy {

  layout: Layout;
  new_grid: number;
  grids: Grid[];
  targetLG: LayoutGrid;
  form: FormGroup;
  id: number;
  private sub: any;
  private nav: any;

  constructor(private fb: FormBuilder,
    private conf: ConfigService,
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
    this.targetLG = {
      position: this.layout.grids.length,
      layout_id: this.layout.id,
      grid_id: this.new_grid,
      id: null
    };
    this.conf.createLayoutGrid(this.targetLG)
      .subscribe( () => {
        this.router.navigate(['/layouts', this.id]);
      }
    );
  }

  async removeGrid(index: number) {
    for (let lg of this.layout.layout_grids) {
      if (lg.position == index) {
        this.conf.deleteLayoutGrid(lg.id).subscribe();
      }
      else if (lg.position > index) {
        this.targetLG = {
          position: lg.position - 1,
          layout_id: lg.layout_id,
          grid_id: lg.grid_id,
          id: lg.id
        };
        this.conf.updateLayoutGrid(this.targetLG).subscribe();
      }
    }
    this.router.navigate(['/layouts', this.id]);
  }

  async shiftGridUp(index: number) {
    for (let lg of this.layout.layout_grids) {
      this.targetLG = {
        position: lg.position,
        layout_id: lg.layout_id,
        grid_id: lg.grid_id,
        id: lg.id
      };
      if (lg.position == index) {
        this.targetLG.position -= 1;
      }
      else if (lg.position == index - 1) {
        this.targetLG.position += 1;
      } 
      this.conf.updateLayoutGrid(this.targetLG).subscribe();
    }
    this.router.navigate(['/layouts', this.id]);
  }

  async shiftGridDown(index: number) {
    for (let lg of this.layout.layout_grids) {
      this.targetLG = {
        position: lg.position,
        layout_id: lg.layout_id,
        grid_id: lg.grid_id,
        id: lg.id
      };
      if (lg.position == index) {
        this.targetLG.position += 1;
      }
      else if (lg.position == index + 1) {
        this.targetLG.position -= 1;
      }
      this.conf.updateLayoutGrid(this.targetLG).subscribe();
    }
    this.router.navigate(['/layouts', this.id]);
  }

  onSubmit(){
    this.conf.updateLayout(this.layout.id, this.form.value)
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
      this.conf.getLayoutById(this.id)
        .subscribe(res => {
          this.layout = res;
          this.form.patchValue({
            name: this.layout.name,
            background: this.layout.background,
            duration: this.layout.duration
          });
        });
    });
    this.conf.getGrids()
      .subscribe(res => this.grids = res);
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.nav.unsubscribe();
  }

}
