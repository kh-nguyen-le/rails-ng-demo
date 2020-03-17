import { Component, OnInit } from '@angular/core';
import { ConfigService, Grid } from '../../config.service'
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-editor-grid',
  templateUrl: './editor-grid.component.html',
  styleUrls: ['./editor-grid.component.css']
})
export class EditorGridComponent implements OnInit {

  grids: Grid[];

  constructor(private titleService: Title,
    private conf: ConfigService) {
      this.titleService.setTitle("Editor - Grids");
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
    this.getGrids();
  }

}
