import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Login';
  layouts;
  constructor (
    private http: HttpClient) {

  }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/layouts.json')
      .subscribe(res => this.layouts = res);
  }
}
