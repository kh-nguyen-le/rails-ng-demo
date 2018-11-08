import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-widget',
  templateUrl: './edit-widget.component.html',
  styleUrls: ['./edit-widget.component.css']
})
export class EditWidgetComponent implements OnInit, OnDestroy {

  apiUrl = environment.apiUrl;
  widget;
  form: FormGroup;
  results: FormControl;
  id: Number;
  private sub: any;
  private nav: any;

  constructor(fb: FormBuilder,
    private http: HttpClient,
    public snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute) {
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
    this.results = fb.control('');
    this.nav = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.init();
      }
    });
  }

  onSubmit(){
    
    this.http.put(`${this.apiUrl}/widgets/${this.id}`, this.form.value)
      .subscribe( () => {
        this.snackBar.open('Primary Attributes updated', '', {
          duration: 2000
        });
        }
      );
   }

   submitData(){
    let res = JSON.parse(this.results.value);
    let widget = {results: res}; 
    this.http.put(`${this.apiUrl}/widgets/${this.id}`, widget)
      .subscribe( () => {
        this.snackBar.open('Data Entered', '', {
          duration: 2000
        });
        }
      );
   }

   init() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.http.get(`${this.apiUrl}/widgets/${this.id}`)
        .subscribe(res => {
          this.widget = res;
          this.form.patchValue({
            name: this.widget.name,
            config: this.widget.config,
          });
          this.results.patchValue(JSON.stringify(this.widget.results));
        });
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.nav.unsubscribe();
  }
}
