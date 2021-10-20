import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DashComponent } from './display/dash/dash.component';
import { GridComponent } from './display/grid/grid.component';
import { WidgetComponent } from './display/widget/widget.component';
import { HttpClientModule } from '@angular/common/http';
import { EditorLayoutComponent } from './editor/editor-layout/editor-layout.component';
import { EditorGridComponent } from './editor/editor-grid/editor-grid.component';
import { EditorWidgetComponent } from './editor/editor-widget/editor-widget.component';
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
import { MatSidenavModule } from '@angular/material/sidenav';
import { AppRoutingModule } from './app-routing.module';
import { NewLayoutComponent } from './editor/new-layout/new-layout.component';
import { NewGridComponent } from './editor/new-grid/new-grid.component';
import { NewWidgetComponent } from './editor/new-widget/new-widget.component';
import { EditLayoutComponent } from './editor/edit-layout/edit-layout.component';
import { EditGridComponent } from './editor/edit-grid/edit-grid.component';
import { EditWidgetComponent } from './editor/edit-widget/edit-widget.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './shared/state/';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EditorModule } from './shared/state/editor-state/';
import { DisplayModule } from './shared/state/display-state/display.module';
import { HomeComponent } from './display/home/home.component';

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
    EditWidgetComponent,
    HomeComponent,
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
    MatSidenavModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DisplayModule,
    EditorModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
