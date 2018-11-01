import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-editor-widget',
  templateUrl: './editor-widget.component.html',
  styleUrls: ['./editor-widget.component.css']
})
export class EditorWidgetComponent implements OnInit {

  constructor(private app: AppComponent) { }

  ngOnInit() {
    this.app.title = "Editor - Widgets";
  }

}
