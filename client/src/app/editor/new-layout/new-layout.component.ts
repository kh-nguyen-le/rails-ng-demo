import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService, Layout } from '../../config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-layout',
  templateUrl: './new-layout.component.html',
  styleUrls: ['./new-layout.component.css'],
})
export class NewLayoutComponent {
  form: FormGroup;
  new_id: Layout;

  constructor(
    fb: FormBuilder,
    private conf: ConfigService,
    private router: Router
  ) {
    this.form = fb.group({
      name: ['', Validators.required],
      background: '',
      duration: '',
    });
  }

  onSubmit(): void {
    this.conf.createLayout(this.form.value).subscribe((res: Layout) => {
      this.new_id = res;
      this.router.navigate(['/layouts', this.new_id.id]);
    });
  }
}
