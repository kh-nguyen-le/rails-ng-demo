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
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
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
    MatCheckboxModule,
    MatTabsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
