import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetComponent } from './widget.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Widget } from '../config.service';

describe('WidgetComponent', () => {
  let component: WidgetComponent;
  let fixture: ComponentFixture<WidgetComponent>;
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
    widgetType: '',
  };
  const widget: Widget = { id: 1, name: 'Test', results: [], config: config };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WidgetComponent],
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
    fixture = TestBed.createComponent(WidgetComponent);
    component = fixture.componentInstance;
    component.widget = widget;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should update upon receiving new data with #refresh', () => {
    component.refresh({ name: 'Widget', id: 1, config: config, results: []});
    expect(component.widget.name).toBe('Widget');
  });
});
