import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditLayoutComponent } from './edit-layout.component';
import { EditorLayoutComponent } from '../editor-layout/editor-layout.component';
import { NewLayoutComponent } from '../new-layout/new-layout.component';
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
import { AppState } from 'src/app/shared/state';
import { Layout } from 'src/app/shared/models/layout.model';
import { LayoutSelectors } from 'src/app/shared/state/display-state';

describe('EditLayoutComponent', () => {
  let component: EditLayoutComponent;
  let fixture: ComponentFixture<EditLayoutComponent>;
  let store: MockStore<AppState>;
  const layout: Layout = {
    kind: "layout",
    id: 1,
    name: 'Test',
    background: 'white',
    duration: 0,
    grids: [],
    layout_grids: [],
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          EditLayoutComponent,
          EditorLayoutComponent,
          NewLayoutComponent,
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
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLayoutComponent);
    component = fixture.componentInstance;
    store.overrideSelector(LayoutSelectors.selectCurrentLayout,  layout);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
