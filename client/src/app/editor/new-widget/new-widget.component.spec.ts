import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewWidgetComponent } from './new-widget.component';
import { EditorWidgetComponent } from '../editor-widget/editor-widget.component';
import { EditWidgetComponent } from '../edit-widget/edit-widget.component';
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
import { ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('NewWidgetComponent', () => {
  let component: NewWidgetComponent;
  let fixture: ComponentFixture<NewWidgetComponent>;
  let store: MockStore;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        EditorWidgetComponent,
        EditWidgetComponent,
        NewWidgetComponent,
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
    fixture = TestBed.createComponent(NewWidgetComponent);
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

  it('should require a widget type', () => {
    const form = component.form;
    const config = form.controls['config'] as FormGroup;
    const widgetType = config.controls['widgetType'];
    let errors = widgetType.errors || {};
    
    expect(widgetType.valid).toBeFalsy();
    expect(errors['required']).toBeTruthy();

    widgetType.setValue('line');
    errors = widgetType.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(widgetType.valid).toBeTruthy();
  });

  it('should be valid with required values valid', () => {
    const form = component.form;
    const name = form.controls['name'];
    const config = form.controls['config'] as FormGroup;
    
    name.setValue('Test');
    const widgetType = config.controls['widgetType'];
    widgetType.setValue('line');
    expect(form.errors).toBeFalsy();
    expect(form.valid).toBeTruthy();
  });
});
