import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewLayoutComponent } from './new-layout.component';
import { EditLayoutComponent } from '../edit-layout/edit-layout.component';
import { EditorLayoutComponent } from '../editor-layout/editor-layout.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('NewLayoutComponent', () => {
  let component: NewLayoutComponent;
  let fixture: ComponentFixture<NewLayoutComponent>;
  let store: MockStore;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        NewLayoutComponent,
        EditLayoutComponent,
        EditorLayoutComponent,
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
        RouterTestingModule,
      ],
      providers: [provideMockStore({})],
    }).compileComponents();
    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not be valid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('should require a name', () => {
    const form = component.form;
    const name = form.controls['name'];
    let errors = name.errors || {};
    
    expect(name.valid).toBeFalsy();
    expect(errors['required']).toBeTruthy();
    
    name.setValue('Test');
    errors = name.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(name.valid).toBeTruthy();
  });

  it('should not allow negative duration', () => {
    const form = component.form;
    const duration = form.controls['duration'];
    let errors = duration.errors || {};

    expect(errors['min']).toBeFalsy();
    expect(duration.value).toBe(0);
    expect(duration.valid).toBeTruthy();

    duration.setValue(-1000);
    errors = duration.errors || {};
    expect(errors['min']).toBeTruthy();
    expect(duration.valid).toBeFalsy();
  });
});
