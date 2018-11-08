import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Login';
  layouts;
  apiUrl = environment.apiUrl;

  constructor (
    private http: HttpClient) {

  }

  getLayouts() {
    this.http.get(`${this.apiUrl}/layouts.json`)
      .subscribe(res => this.layouts = res);
  }

  ngOnInit(): void {
    
  }
}
