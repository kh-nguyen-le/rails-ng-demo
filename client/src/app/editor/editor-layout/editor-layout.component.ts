import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../shared/config.service';
import { Title } from '@angular/platform-browser';
import { Layout } from '../../shared/models/layout.model';

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

  deleteLayout(id: number): void {
    this.conf.deleteLayout(id).subscribe(() => this.getLayouts());
  }

  getLayouts(): void {
    this.conf.getLayouts().subscribe((res) => (this.layouts = res));
  }

  ngOnInit(): void {
    this.getLayouts();
  }
}
