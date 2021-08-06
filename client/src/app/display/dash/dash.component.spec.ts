import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DashComponent } from './dash.component';
import { GridComponent } from '../grid/grid.component';
import { WidgetComponent } from '../widget/widget.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { RouterTestingModule } from '@angular/router/testing';
import { Widget } from '../../shared/models/widget.model';
import { Grid } from '../../shared/models/grid.model';
import { Layout } from '../../shared/models/layout.model';

describe('DashComponent', () => {
  let component: DashComponent;
  let fixture: ComponentFixture<DashComponent>;
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
  const grid: Grid = {
    id: 1,
    name: 'Grid',
    title: '2',
    col: 5,
    size: '2:1',
    widgets: [{ id: 1, name: 'Test', results: [], config: config }],
    layouts: [],
    layout_grids: [],
    grid_widgets: [],
  };
  const layout: Layout = {
    id: 1,
    name: 'Test',
    background: 'white',
    duration: 0,
    grids: [],
    layout_grids: [],
  };
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DashComponent, GridComponent, WidgetComponent],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatGridListModule,
        NgxChartsModule,
        MatTabsModule,
        RouterTestingModule,
      ],
      providers: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashComponent);
    component = fixture.componentInstance;
    component.layout = layout;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when receiving new data', () => {
    const new_layout: Layout = {
      id: 1,
      name: 'Layout',
      background: 'grey',
      duration: 3000,
      grids: [grid],
      layout_grids: [],
    };

    it('should be able to update attributes', () => {
      component.refresh(new_layout);
      expect(component.layout.name).toEqual(new_layout.name);
      expect(component.layout.background).toEqual(new_layout.background);
      expect(component.layout.duration).toEqual(new_layout.duration);
    });

    it('should be able to add a grid', () => {
      component.refresh(new_layout);
      component.grids$.subscribe((grids: Grid[]) => {
        expect(grids).toEqual(new_layout.grids);
      });
      expect(component.layout).toEqual(new_layout);
    });
  });
});
