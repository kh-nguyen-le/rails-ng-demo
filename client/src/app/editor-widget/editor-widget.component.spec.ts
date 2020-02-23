import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorWidgetComponent } from './editor-widget.component';
import { EditWidgetComponent } from '../edit-widget/edit-widget.component';
import { NewWidgetComponent } from '../new-widget/new-widget.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule, MatToolbarModule, MatButtonModule, MatIconModule, MatListModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatSelectModule, MatCheckboxModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '../app.component';

describe('EditorWidgetComponent', () => {
  let component: EditorWidgetComponent;
  let fixture: ComponentFixture<EditorWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        EditorWidgetComponent,
        EditWidgetComponent,
        NewWidgetComponent
       ],
       imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
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
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule
      ],
      providers: [
        AppComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
