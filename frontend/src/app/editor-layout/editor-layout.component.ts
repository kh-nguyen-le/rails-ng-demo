import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editor-layout',
  templateUrl: './editor-layout.component.html',
  styleUrls: ['./editor-layout.component.css']
})
export class EditorLayoutComponent implements OnInit {

  apiUrl = environment.apiUrl;

  deleteLayout(id: Number) {
    this.http.delete(`${this.apiUrl}/layouts/${id}`)
      .subscribe( () => this.app.getLayouts());
  }

  constructor(public app: AppComponent,
    private http: HttpClient,
    ) { }

  ngOnInit() {
    this.app.title = "Editor - Layouts";
    this.app.getLayouts();
  }

}
