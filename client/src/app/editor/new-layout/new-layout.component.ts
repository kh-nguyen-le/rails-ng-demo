import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Layout } from '../../shared/models/layout.model';
import { Store } from '@ngrx/store';
import { LayoutState } from 'src/app/shared/state/display-state';
import { CreateActions } from 'src/app/shared/state/editor-state';

@Component({
  selector: 'app-new-layout',
  templateUrl: './new-layout.component.html',
  styleUrls: ['./new-layout.component.css'],
})
export class NewLayoutComponent {
  form: FormGroup;
  layout: Layout;

  constructor(fb: FormBuilder, private store: Store<LayoutState.State>) {
    this.form = fb.group({
      name: ['', Validators.required],
      background: '',
      duration: [0, Validators.min(0)],
    });
  }

  onSubmit(): void {
    this.layout = this.form.value;
    this.store.dispatch(CreateActions.createLayout({ layout: this.layout }));
  }
}
