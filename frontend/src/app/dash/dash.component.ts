import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Http } from '@angular/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  widgets;
  constructor (private http: Http, private app: AppComponent) {

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.http.get('http://localhost:3000/widgets.json')
      .subscribe(res => this.widgets = res.json());
    this.app.title = "Dashboard";
  }

}
