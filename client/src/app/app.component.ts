import { Component } from '@angular/core';
import { ConfigService, Layout } from './config.service'
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  layouts: Layout[];
  apiUrl = environment.apiUrl;

  constructor (private conf: ConfigService,
    public titleService: Title) {
      this.titleService.setTitle('rails-ng demo');
  }

  getLayouts() {
    this.conf.getLayouts()
      .subscribe(res => this.layouts = res);
  }

  ngOnInit(): void {
    this.getLayouts();
  }
}
