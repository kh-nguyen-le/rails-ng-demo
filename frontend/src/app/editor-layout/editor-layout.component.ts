import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editor-layout',
  templateUrl: './editor-layout.component.html',
  styleUrls: ['./editor-layout.component.css']
})
export class EditorLayoutComponent implements OnInit {

  deleteLayout(id: Number) {
    this.http.delete(`http://localhost:3000/layouts/${id}`)
      .subscribe( () => this.app.getLayouts());
  }

  constructor(private app: AppComponent,
    private http: HttpClient,
    ) { }

  ngOnInit() {
    this.app.title = "Editor - Layouts";
  }

}
