import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-widget',
  templateUrl: './new-widget.component.html',
  styleUrls: ['./new-widget.component.css']
})
export class NewWidgetComponent implements OnInit {

  form: FormGroup;
  new_id;

  constructor(fb: FormBuilder,
    private http: HttpClient,
    private router: Router) {
      this.form = fb.group({
        name: '',
        config: fb.group({
          widgetType: ['', Validators.required],
          gradient: false,
          showXAxis: false,
          showYAxis: false,
          showLegend: false,
          showXAxisLabel: false,
          showYAxisLabel: false,
          xAxisLabel: 'x-axis',
          yAxisLabel: 'y-axis',
          autoScale: false
      })
    });
  }

  onSubmit(){
    
    this.http.post('http://localhost:3000/widgets', this.form.value)
      .subscribe(res => { this.new_id = res;
        this.router.navigate(['/widgets', this.new_id.id]);}
      );
   }

  ngOnInit() {
  }

}
