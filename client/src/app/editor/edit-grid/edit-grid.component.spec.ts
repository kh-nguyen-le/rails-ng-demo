import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditGridComponent } from './edit-grid.component';
import { EditorGridComponent } from '../editor-grid/editor-grid.component';
import { NewGridComponent } from '../new-grid/new-grid.component';
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
import { GridSelectors } from 'src/app/shared/state/display-state';
import { Grid } from 'src/app/shared/models/grid.model';

describe('EditGridComponent', () => {
  let component: EditGridComponent;
  let fixture: ComponentFixture<EditGridComponent>;
  let store: MockStore<AppState>;
  const grid: Grid = {
    kind: "grid",
    id: 1,
    name: 'Grid',
    title: '2',
    col: 5,
    size: '2:1',
    widgets: [],
    layouts: [],
    layout_grids: [],
    grid_widgets: [],
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          EditGridComponent,
          EditorGridComponent,
          NewGridComponent,
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
    fixture = TestBed.createComponent(EditGridComponent);
    component = fixture.componentInstance;
    store.overrideSelector(GridSelectors.selectCurrentGrid, grid);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
