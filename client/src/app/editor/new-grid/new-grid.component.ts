import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfigService, Grid } from '../../config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-grid',
  templateUrl: './new-grid.component.html',
  styleUrls: ['./new-grid.component.css'],
})
export class NewGridComponent {
  form: FormGroup;
  new_id: Grid;

  constructor(
    fb: FormBuilder,
    private conf: ConfigService,
    private router: Router
  ) {
    this.form = fb.group({
      name: ['', Validators.required],
      title: '',
      col: '',
      size: '',
    });
  }

  onSubmit(): void {
    this.conf.createGrid(this.form.value).subscribe((res: Grid) => {
      this.new_id = res;
      this.router.navigate(['/grids', this.new_id.id]);
    });
  }
}
