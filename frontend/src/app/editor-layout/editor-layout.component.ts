import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-editor-layout',
  templateUrl: './editor-layout.component.html',
  styleUrls: ['./editor-layout.component.css']
})
export class EditorLayoutComponent implements OnInit {

  constructor(private app: AppComponent) { }

  ngOnInit() {
    this.app.title = "Editor - Layouts";
  }

}
