import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
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
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DashComponent } from './display/dash/dash.component';
import { EditorWidgetComponent } from './editor/editor-widget/editor-widget.component';
import { NewWidgetComponent } from './editor/new-widget/new-widget.component';
import { EditWidgetComponent } from './editor/edit-widget/edit-widget.component';
import { EditorGridComponent } from './editor/editor-grid/editor-grid.component';
import { NewGridComponent } from './editor/new-grid/new-grid.component';
import { EditGridComponent } from './editor/edit-grid/edit-grid.component';
import { EditLayoutComponent } from './editor/edit-layout/edit-layout.component';
import { EditorLayoutComponent } from './editor/editor-layout/editor-layout.component';
import { NewLayoutComponent } from './editor/new-layout/new-layout.component';
import { GridComponent } from './display/grid/grid.component';
import { WidgetComponent } from './display/widget/widget.component';
import { APP_BASE_HREF } from '@angular/common';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Component } from '@angular/core';

describe('AppComponent', () => {
  let store: MockStore;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          AppComponent,
          DashComponent,
          GridComponent,
          WidgetComponent,
          EditorWidgetComponent,
          EditorGridComponent,
          EditorLayoutComponent,
          EditGridComponent,
          EditWidgetComponent,
          EditLayoutComponent,
          NewLayoutComponent,
          NewGridComponent,
          NewWidgetComponent,
          SidenavContainerStubComponent,
          SidenavContentStubComponent,
          SidenavStubComponent,
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
          FormsModule,
        ],
        providers: [
          { provide: APP_BASE_HREF, useValue: '/' },
          provideMockStore({}),
        ],
      }).compileComponents();
      store = TestBed.inject(MockStore);
    })
  );
  it(
    'should create the app',
    waitForAsync(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    })
  );
  it(
    `should have as title 'rails-ng demo'`,
    waitForAsync(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app.titleService.getTitle()).toEqual('rails-ng demo');
    })
  );
});

@Component({ selector: 'mat-sidenav-container', template: '' })
class SidenavContainerStubComponent {}

@Component({ selector: 'mat-sidenav-content', template: '' })
class SidenavContentStubComponent {}

@Component({ selector: 'mat-sidenav', template: '' })
class SidenavStubComponent {}