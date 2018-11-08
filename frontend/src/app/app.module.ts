import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DashComponent } from './dash/dash.component';
import { GridComponent } from './grid/grid.component';
import { WidgetComponent } from './widget/widget.component';
import { HttpClientModule } from '@angular/common/http';
import { EditorLayoutComponent } from './editor-layout/editor-layout.component';
import { EditorGridComponent } from './editor-grid/editor-grid.component';
import { EditorWidgetComponent } from './editor-widget/editor-widget.component';
import { MatGridListModule, MatMenuModule, MatToolbarModule, MatButtonModule,
  MatIconModule, MatListModule, MatFormFieldModule, MatInputModule,
  MatSnackBarModule, MatSelectModule } from '@angular/material/';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewLayoutComponent } from './new-layout/new-layout.component';
import { NewGridComponent } from './new-grid/new-grid.component';
import { NewWidgetComponent } from './new-widget/new-widget.component';
import { EditLayoutComponent } from './edit-layout/edit-layout.component';
import { EditGridComponent } from './edit-grid/edit-grid.component';
import { EditWidgetComponent } from './edit-widget/edit-widget.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DashComponent,
    GridComponent,
    WidgetComponent,
    EditorLayoutComponent,
    EditorGridComponent,
    EditorWidgetComponent,
    NewLayoutComponent,
    NewGridComponent,
    NewWidgetComponent,
    EditLayoutComponent,
    EditGridComponent,
    EditWidgetComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatGridListModule,
    NgxChartsModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
