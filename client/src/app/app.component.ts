import { Component } from '@angular/core';
import { ConfigService, Layout } from './config.service'
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Login';
  layouts: Layout[];
  apiUrl = environment.apiUrl;

  constructor (private conf: ConfigService) {

  }

  getLayouts() {
    this.conf.getLayouts()
      .subscribe(res => this.layouts = res);
  }

  ngOnInit(): void {
    this.getLayouts();
  }
}
