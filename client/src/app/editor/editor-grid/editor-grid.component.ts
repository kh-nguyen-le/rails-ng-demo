import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../shared/config.service';
import { Title } from '@angular/platform-browser';
import { Grid } from '../../shared/models/grid.model';

@Component({
  selector: 'app-editor-grid',
  templateUrl: './editor-grid.component.html',
  styleUrls: ['./editor-grid.component.css'],
})
export class EditorGridComponent implements OnInit {
  grids: Grid[];

  constructor(private titleService: Title, private conf: ConfigService) {
    this.titleService.setTitle('Editor - Grids');
  }

  deleteGrid(id: number): void {
    this.conf.deleteGrid(id).subscribe(() => this.getGrids());
  }

  getGrids(): void {
    this.conf.getGrids().subscribe((res) => (this.grids = res));
  }

  ngOnInit(): void {
    this.getGrids();
  }
}
