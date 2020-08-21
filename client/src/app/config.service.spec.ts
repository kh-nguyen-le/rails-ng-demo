import { TestBed } from '@angular/core/testing';

import { ConfigService, Widget } from './config.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('ConfigService', () => {
  let httpTestingController: HttpTestingController;
  let service: ConfigService;
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigService],
      imports: [HttpClientTestingModule],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ConfigService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getLayouts', () => {
    it('should return all available layouts', () => {
      const mockLayouts = [
        {
          id: 1,
          name: 'Test',
          background: 'white',
          duration: 0,
          grids: [],
          layout_grids: [],
        },
        {
          id: 2,
          name: 'Layout',
          background: 'white',
          duration: 0,
          grids: [],
          layout_grids: [],
        },
      ];
      service.getLayouts().subscribe((layoutsData) => {
        expect(layoutsData[0].name).toEqual('Test');
        expect(layoutsData[1].name).toEqual('Layout');
      });
      const req = httpTestingController.expectOne(
        `${service.apiUrl}/layouts.json`
      );
      req.flush(mockLayouts);
    });
  });

  describe('#getGrids', () => {
    it('should return all available grids', () => {
      const mockGrids = [
        {
          id: 1,
          name: 'Grid',
          title: 'Test',
          col: 2,
          size: '2:1',
          widgets: [],
          layouts: [],
          layout_grids: [],
          grid_widgets: [],
        },
        {
          id: 2,
          name: 'Test',
          title: 'Grid',
          col: 2,
          size: '2:1',
          widgets: [],
          layouts: [],
          layout_grids: [],
          grid_widgets: [],
        },
      ];
      service.getGrids().subscribe((gridsData) => {
        expect(gridsData[0].name).toEqual('Grid');
        expect(gridsData[0].title).toEqual('Test');
        expect(gridsData[1].name).toEqual('Test');
        expect(gridsData[1].title).toEqual('Grid');
      });
      const req = httpTestingController.expectOne(
        `${service.apiUrl}/grids.json`
      );
      req.flush(mockGrids);
    });
  });

  describe('#getWidgets', () => {
    it('should return all available widgets', () => {
      const mockWidgets = [
        { id: 1, name: 'Widget', results: [], config: config },
        { id: 2, name: 'Test', results: [], config: config },
      ];
      service.getWidgets().subscribe((gridsData) => {
        expect(gridsData[0].name).toEqual('Widget');
        expect(gridsData[1].name).toEqual('Test');
      });
      const req = httpTestingController.expectOne(
        `${service.apiUrl}/widgets.json`
      );
      req.flush(mockWidgets);
    });
  });
});
