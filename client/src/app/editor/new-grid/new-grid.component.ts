import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Grid } from '../../shared/models/grid.model';
import { Store } from '@ngrx/store';
import { GridState } from 'src/app/shared/state/display-state';
import { CreateActions } from 'src/app/shared/state/editor-state';

@Component({
  selector: 'app-new-grid',
  templateUrl: './new-grid.component.html',
  styleUrls: ['./new-grid.component.css'],
})
export class NewGridComponent {
  form: FormGroup;
  grid: Grid;

  constructor(fb: FormBuilder, private store: Store<GridState.State>) {
    this.form = fb.group({
      name: ['', Validators.required],
      title: '',
      col: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
      size: '1:1',
    });
  }

  onSubmit(): void {
    this.grid = this.form.value;
    this.store.dispatch(CreateActions.createGrid({ grid: this.grid }));
  }
}
