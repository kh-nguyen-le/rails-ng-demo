import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  widgets;
  constructor (private http: Http) {

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.http.get('http://localhost:3000/widgets.json')
      .subscribe(res => this.widgets = res.json());
  }
}
