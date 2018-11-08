import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editor-grid',
  templateUrl: './editor-grid.component.html',
  styleUrls: ['./editor-grid.component.css']
})
export class EditorGridComponent implements OnInit {

  grids;
  apiUrl = environment.apiUrl;

  constructor(private app: AppComponent,
    private http: HttpClient) {

  }

  deleteGrid(id: Number) {
    this.http.delete(`${this.apiUrl}/grids/${id}`)
      .subscribe( () => this.getGrids());
  }
  
  getGrids() {
    this.http.get(`${this.apiUrl}/grids`)
      .subscribe(res => this.grids = res);
  }

  ngOnInit() {
    this.app.title = "Editor - Grids";
    this.getGrids();
  }

}
