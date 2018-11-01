import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-editor-grid',
  templateUrl: './editor-grid.component.html',
  styleUrls: ['./editor-grid.component.css']
})
export class EditorGridComponent implements OnInit {

  constructor(private app: AppComponent) { }

  ngOnInit() {
    this.app.title = "Editor - Grids";
  }

}
