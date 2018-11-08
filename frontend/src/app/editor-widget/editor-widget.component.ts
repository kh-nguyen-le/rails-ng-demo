import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editor-widget',
  templateUrl: './editor-widget.component.html',
  styleUrls: ['./editor-widget.component.css']
})
export class EditorWidgetComponent implements OnInit {

  widgets;
  apiUrl = environment.apiUrl;

  constructor(private app: AppComponent,
    private http: HttpClient) { }


  deleteWidget(id: Number) {
    this.http.delete(`${this.apiUrl}/widgets/${id}`)
      .subscribe( () => this.getWidgets());
    }
    
  getWidgets() {
    this.http.get(`${this.apiUrl}/widgets`)
      .subscribe(res => this.widgets = res);
    }
  ngOnInit() {
    this.app.title = "Editor - Widgets";
    this.getWidgets();
  }

}
