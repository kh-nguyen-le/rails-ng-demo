import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editor-widget',
  templateUrl: './editor-widget.component.html',
  styleUrls: ['./editor-widget.component.css']
})
export class EditorWidgetComponent implements OnInit {

  widgets;

  constructor(private app: AppComponent,
    private http: HttpClient) { }


  deleteWidget(id: Number) {
    this.http.delete(`http://localhost:3000/widgets/${id}`)
      .subscribe( () => this.getWidgets());
    }
    
  getWidgets() {
    this.http.get('http://localhost:3000/widgets')
      .subscribe(res => this.widgets = res);
    }
  ngOnInit() {
    this.app.title = "Editor - Widgets";
    this.getWidgets();
  }

}
