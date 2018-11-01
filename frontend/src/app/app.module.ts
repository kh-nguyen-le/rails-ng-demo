import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DashComponent } from './dash/dash.component';
import { GridComponent } from './grid/grid.component';
import { WidgetComponent } from './widget/widget.component';
import { EditorLayoutComponent } from './editor-layout/editor-layout.component';
import { EditorGridComponent } from './editor-grid/editor-grid.component';
import { EditorWidgetComponent } from './editor-widget/editor-widget.component';

@NgModule({
  declarations: [
    AppComponent,
    DashComponent,
    GridComponent,
    WidgetComponent,
    EditorLayoutComponent,
    EditorGridComponent,
    EditorWidgetComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MatGridListModule,
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
