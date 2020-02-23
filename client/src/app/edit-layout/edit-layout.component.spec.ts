import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLayoutComponent } from './edit-layout.component';
import { EditorLayoutComponent } from '../editor-layout/editor-layout.component';
import { NewLayoutComponent } from '../new-layout/new-layout.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule, MatToolbarModule, MatButtonModule, MatIconModule, MatListModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatSelectModule, MatCheckboxModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '../app.component';

describe('EditLayoutComponent', () => {
  let component: EditLayoutComponent;
  let fixture: ComponentFixture<EditLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EditLayoutComponent,
        EditorLayoutComponent,
        NewLayoutComponent
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
    fixture = TestBed.createComponent(EditLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
