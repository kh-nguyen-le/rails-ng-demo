import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfigService } from '../../shared/config.service';
import { Router } from '@angular/router';
import { Grid } from '../../shared/models/grid.model';

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
      col: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
      size: '1:1',
    });
  }

  onSubmit(): void {
    this.conf.createGrid(this.form.value).subscribe((res: Grid) => {
      this.new_id = res;
      this.router.navigate(['/grids', this.new_id.id]);
    });
  }
}
