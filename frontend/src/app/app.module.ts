import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
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
import {MatMenuModule, MatToolbarModule, MatIconModule} from '@angular/material/';
import { AppRoutingModule } from './app-routing.module';

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
    BrowserAnimationsModule,
    HttpModule,
    MatGridListModule,
    NgxChartsModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
