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

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;
  const grid: Grid = {
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
    autoscale: true,
    showXAxis: true,
    showYAxis: true,
    showXAxisLabel: true,
    showYAxisLabel: true,
    showLegend: false,
    xAxisLabel: '',
    yAxisLabel: '',
    widgetType: 'line',
  };
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [GridComponent, WidgetComponent],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatGridListModule,
        NgxChartsModule,
      ],
    }).compileComponents();
  }));

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
      const new_grid = {
        id: 1,
        name: 'Grid',
        title: 'Test',
        col: 2,
        size: '2:1',
        widgets: [{ id: 1, name: 'Test', results: [], config: config }],
        layouts: [],
        layout_grids: [],
        grid_widgets: [],
      };

    it('should be able to update attributes', () => {
      component.refresh(new_grid);
      expect(component.grid.name).toEqual('Grid');
      expect(component.grid.title).toEqual('Test');
      expect(component.grid.col).toEqual(2);
    });

    it('should be able to add a widget', () => {
      component.refresh(new_grid);
      component.widgets$.subscribe((widgets: Widget[]) => {
        expect(widgets).toEqual(new_grid.widgets);
      });
      expect(component.grid).toEqual(new_grid);
    });
  });
});
