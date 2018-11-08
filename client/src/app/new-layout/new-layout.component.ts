import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-new-layout',
  templateUrl: './new-layout.component.html',
  styleUrls: ['./new-layout.component.css']
})
export class NewLayoutComponent implements OnInit {

  form: FormGroup;
  new_id;
  apiUrl = environment.apiUrl;
  
  constructor(fb: FormBuilder,
    private http: HttpClient,
    private router: Router) {
    this.form = fb.group({
      name: '',
      background: '',
      duration: ''
    });
   }

   onSubmit(){
    this.http.post(`${this.apiUrl}/layouts`, this.form.value)
      .subscribe(res => { this.new_id = res;
        this.router.navigate(['/layouts', this.new_id.id]);}
      );
   }

  ngOnInit() {
  }

}
