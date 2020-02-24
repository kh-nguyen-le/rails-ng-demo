import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-editor-layout',
  templateUrl: './editor-layout.component.html',
  styleUrls: ['./editor-layout.component.css']
})
export class EditorLayoutComponent implements OnInit {

  constructor(public app: AppComponent,
    private conf: ConfigService,
    ) { }

  deleteLayout(id: number) {
    this.conf.deleteLayout(id)
      .subscribe( () => this.app.getLayouts());
  }

  ngOnInit() {
    this.app.title = "Editor - Layouts";
    this.app.getLayouts();
  }

}
