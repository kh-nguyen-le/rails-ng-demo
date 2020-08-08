import { Component, OnInit } from '@angular/core';
import { ConfigService, Layout } from '../../config.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-editor-layout',
  templateUrl: './editor-layout.component.html',
  styleUrls: ['./editor-layout.component.css'],
})
export class EditorLayoutComponent implements OnInit {
  layouts: Layout[];

  constructor(private titleService: Title, private conf: ConfigService) {
    this.titleService.setTitle('Editor - Layouts');
  }

  deleteLayout(id: number) {
    this.conf.deleteLayout(id).subscribe(() => this.getLayouts());
  }

  getLayouts() {
    this.conf.getLayouts().subscribe((res) => (this.layouts = res));
  }

  ngOnInit() {
    this.getLayouts();
  }
}
