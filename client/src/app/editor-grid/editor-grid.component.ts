import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ConfigService, Grid } from '../config.service'

@Component({
  selector: 'app-editor-grid',
  templateUrl: './editor-grid.component.html',
  styleUrls: ['./editor-grid.component.css']
})
export class EditorGridComponent implements OnInit {

  grids: Grid[];

  constructor(private app: AppComponent,
    private conf: ConfigService) {

  }

  deleteGrid(id: number) {
    this.conf.deleteGrid(id)
      .subscribe( () => this.getGrids());
  }
  
  getGrids() {
    this.conf.getGrids()
      .subscribe(res => this.grids = res);
  }

  ngOnInit() {
    this.app.title = "Editor - Grids";
    this.getGrids();
  }

}
