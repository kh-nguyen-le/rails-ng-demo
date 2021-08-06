import { Component, OnInit } from '@angular/core';
import { ConfigService } from './shared/config.service';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';
import { Layout } from './shared/models/layout.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  layouts: Layout[];
  apiUrl = environment.apiUrl;

  constructor(private conf: ConfigService, public titleService: Title) {
    this.titleService.setTitle('rails-ng demo');
  }

  getLayouts(): void {
    this.conf.getLayouts().subscribe((res) => (this.layouts = res));
  }

  ngOnInit(): void {
    this.getLayouts();
  }
}
