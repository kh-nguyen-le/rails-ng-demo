import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GridComponent } from './grid.component';
import { WidgetComponent } from '../widget/widget.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Grid } from '../../shared/models/grid.model';
import { Widget } from '../../shared/models/widget.model';
import { AppState } from 'src/app/shared/state';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;
  let store: MockStore<AppState>;
  const grid: Grid = {
    kind: 'grid',
    id: 1,
    name: '1',
    title: '2',
    col: 5,
    size: '2:1',
    widgets: [],
    layouts: [],
    layout_grids: [],
    grid_widgets: [],
  };
  const config: Widget['config'] = {
    gradient: false,
    autoScale: true,
    showXAxis: true,
    showYAxis: true,
    showXAxisLabel: true,
    showYAxisLabel: true,
    showLegend: false,
    xAxisLabel: '',
    yAxisLabel: '',
    widgetType: 'line',
    legendPosition: '',
  };
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [GridComponent, WidgetComponent],
        imports: [
          BrowserModule,
          BrowserAnimationsModule,
          HttpClientModule,
          MatGridListModule,
          NgxChartsModule,
        ],
        providers: [provideMockStore({})],
      }).compileComponents();
      store = TestBed.inject(MockStore);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.debugElement.componentInstance;
    component.grid = grid;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when receiving new data', () => {
    const new_grid: Grid = {
      kind: 'grid',
      id: 1,
      name: 'Grid',
      title: 'Test',
      col: 2,
      size: '2:1',
      widgets: [
        { kind: 'widget', id: 1, name: 'Test', results: [], config: config },
      ],
      layouts: [],
      layout_grids: [],
      grid_widgets: [],
    };
  });
});
