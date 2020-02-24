import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule, MatMenuModule, MatToolbarModule, MatButtonModule, MatIconModule, MatListModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatSelectModule, MatCheckboxModule, MatTabsModule } from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DashComponent } from './dash/dash.component';
import { EditorWidgetComponent } from './editor-widget/editor-widget.component';
import { NewWidgetComponent } from './new-widget/new-widget.component';
import { EditWidgetComponent } from './edit-widget/edit-widget.component';
import { EditorGridComponent } from './editor-grid/editor-grid.component';
import { NewGridComponent } from './new-grid/new-grid.component';
import { EditGridComponent } from './edit-grid/edit-grid.component';
import { EditLayoutComponent } from './edit-layout/edit-layout.component';
import { EditorLayoutComponent } from './editor-layout/editor-layout.component';
import { NewLayoutComponent } from './new-layout/new-layout.component';
import { GridComponent } from './grid/grid.component';
import { WidgetComponent } from './widget/widget.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
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
        NewWidgetComponent
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
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'ng-rails demo'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('ng-rails demo');
  }));
});
