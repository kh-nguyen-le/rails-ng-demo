import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../shared/config.service';
import { Title } from '@angular/platform-browser';
import { Widget } from '../../shared/models/widget.model';

@Component({
  selector: 'app-editor-widget',
  templateUrl: './editor-widget.component.html',
  styleUrls: ['./editor-widget.component.css'],
})
export class EditorWidgetComponent implements OnInit {
  widgets: Widget[];

  constructor(private titleService: Title, private conf: ConfigService) {
    this.titleService.setTitle('Editor - Widgets');
  }

  deleteWidget(id: number): void {
    this.conf.deleteWidget(id).subscribe(() => this.getWidgets());
  }

  getWidgets(): void {
    this.conf.getWidgets().subscribe((res) => (this.widgets = res));
  }
  ngOnInit(): void {
    this.getWidgets();
  }
}
