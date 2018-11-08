import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editor-grid',
  templateUrl: './editor-grid.component.html',
  styleUrls: ['./editor-grid.component.css']
})
export class EditorGridComponent implements OnInit {

  grids;

  constructor(private app: AppComponent,
    private http: HttpClient) {

  }

  deleteGrid(id: Number) {
    this.http.delete(`http://localhost:3000/grids/${id}`)
      .subscribe( () => this.getGrids());
  }
  
  getGrids() {
    this.http.get('http://localhost:3000/grids')
      .subscribe(res => this.grids = res);
  }

  ngOnInit() {
    this.app.title = "Editor - Grids";
    this.getGrids();
  }

}
