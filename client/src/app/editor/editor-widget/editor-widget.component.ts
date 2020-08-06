import { Component, OnInit } from '@angular/core';
import { ConfigService, Widget } from '../../config.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-editor-widget',
  templateUrl: './editor-widget.component.html',
  styleUrls: ['./editor-widget.component.css']
})
export class EditorWidgetComponent implements OnInit {

  widgets: Widget[];

  constructor(private titleService: Title,
    private conf: ConfigService) {
      this.titleService.setTitle('Editor - Widgets');
     }

  deleteWidget(id: number) {
    this.conf.deleteWidget(id)
      .subscribe( () => this.getWidgets());
    }

  getWidgets() {
    this.conf.getWidgets()
      .subscribe(res => this.widgets = res);
    }
  ngOnInit() {
    this.getWidgets();
  }

}
