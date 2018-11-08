import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-grid',
  templateUrl: './new-grid.component.html',
  styleUrls: ['./new-grid.component.css']
})
export class NewGridComponent implements OnInit {

  form: FormGroup;
  new_id;

  constructor(fb: FormBuilder,
    private http: HttpClient,
    private router: Router) {
    this.form = fb.group({
      name: '',
      title: '',
      col: '',
      size: ''
    });
   }

   onSubmit(){
    this.http.post('http://localhost:3000/grids', this.form.value)
      .subscribe(res => { this.new_id = res;
        this.router.navigate(['/grids', this.new_id.id]);}
      );
   }

  ngOnInit() {
  }

}
