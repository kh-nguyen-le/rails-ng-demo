import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ConfigService, Widget } from '../config.service'

@Component({
  selector: 'app-editor-widget',
  templateUrl: './editor-widget.component.html',
  styleUrls: ['./editor-widget.component.css']
})
export class EditorWidgetComponent implements OnInit {

  widgets: Widget[];

  constructor(private app: AppComponent,
    private conf: ConfigService) { }


  deleteWidget(id: number) {
    this.conf.deleteWidget(id)
      .subscribe( () => this.getWidgets());
    }
    
  getWidgets() {
    this.conf.getWidgets()
      .subscribe(res => this.widgets = res)
    }
  ngOnInit() {
    this.app.title = "Editor - Widgets";
    this.getWidgets();
  }

}
