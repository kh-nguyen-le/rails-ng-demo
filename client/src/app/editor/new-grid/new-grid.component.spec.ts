import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGridComponent } from './new-grid.component';
import { EditGridComponent } from '../edit-grid/edit-grid.component';
import { EditorGridComponent } from '../editor-grid/editor-grid.component';
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

describe('NewGridComponent', () => {
  let component: NewGridComponent;
  let fixture: ComponentFixture<NewGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewGridComponent, EditGridComponent, EditorGridComponent],
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
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGridComponent);
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
  
  it('should have between 1 and 10 columns inclusive', () => {
    const form = component.form;
    const columns = form.controls['col'];
    let errors = columns.errors || {};

    expect(columns.value).toBe(1);
    expect(errors['min']).toBeFalsy();
    expect(errors['max']).toBeFalsy();
    expect(columns.valid).toBeTruthy();

    columns.setValue(0);
    errors = columns.errors || {};
    expect(errors['min']).toBeTruthy();
    expect(columns.valid).toBeFalsy();

    columns.setValue(100);
    errors = columns.errors || {};
    expect(errors['max']).toBeTruthy();
    expect(columns.valid).toBeFalsy();
  });
});
