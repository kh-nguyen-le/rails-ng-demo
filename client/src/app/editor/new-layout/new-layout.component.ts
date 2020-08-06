import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfigService } from '../../config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-layout',
  templateUrl: './new-layout.component.html',
  styleUrls: ['./new-layout.component.css']
})
export class NewLayoutComponent implements OnInit {

  form: FormGroup;
  new_id;

  constructor(fb: FormBuilder,
    private conf: ConfigService,
    private router: Router) {
    this.form = fb.group({
      name: '',
      background: '',
      duration: ''
    });
   }

   onSubmit() {
    this.conf.createLayout(this.form.value)
      .subscribe(res => { this.new_id = res;
        this.router.navigate(['/layouts', this.new_id.id]); }
      );
   }

  ngOnInit() {
  }

}
