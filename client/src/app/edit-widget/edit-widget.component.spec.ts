import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWidgetComponent } from './edit-widget.component';
import { EditorWidgetComponent } from '../editor-widget/editor-widget.component';
import { NewWidgetComponent } from '../new-widget/new-widget.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule, MatToolbarModule, MatButtonModule, MatIconModule, MatListModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatSelectModule, MatCheckboxModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '../app.component';

describe('EditWidgetComponent', () => {
  let component: EditWidgetComponent;
  let fixture: ComponentFixture<EditWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EditWidgetComponent,
        EditorWidgetComponent,
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
    fixture = TestBed.createComponent(EditWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
