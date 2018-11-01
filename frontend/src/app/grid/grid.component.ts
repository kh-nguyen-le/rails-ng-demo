import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  @Input() grid;
  widgets;
  constructor(private http: HttpClient) { }

  async getData() {
    let data: any = await this.http.get(`http://localhost:3000/grids/${this.grid.id}.json`).toPromise();
    this.widgets = data.widgets;
  }

  ngOnInit() {
    this.getData();
  }

}
