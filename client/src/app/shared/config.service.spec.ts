import { TestBed } from '@angular/core/testing';

import { ConfigService } from './config.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Grid } from './models/grid.model';
import { GridWidget } from './models/gridwidget.model';
import { Layout } from './models/layout.model';
import { LayoutGrid } from './models/layoutgrid.model';
import { Widget } from './models/widget.model';

describe('ConfigService', () => {
  let httpTestingController: HttpTestingController;
  let service: ConfigService;
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
    legendPosition: 'right'
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
      service.getWidgets().subscribe((widgetsData) => {
        expect(widgetsData[0].name).toEqual('Widget');
        expect(widgetsData[1].name).toEqual('Test');
      });
      const req = httpTestingController.expectOne(
        `${service.apiUrl}/widgets.json`
      );
      req.flush(mockWidgets);
    });
  });

  describe('#getLayoutById', () => {
    it('should return specified layout', () => {
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
          duration: 3000,
          grids: [],
          layout_grids: [],
        },
      ];
      const id = 2;
      service.getLayoutById(id).subscribe((layoutData) => {
        expect(layoutData.name).toEqual('Layout');
        expect(layoutData.background).toEqual('white');
        expect(layoutData.duration).toBe(3000);
      });
      const req = httpTestingController.expectOne(
        `${service.apiUrl}/layouts/${id}.json`
      );
      req.flush(mockLayouts[id - 1]);
    });
  });

  describe('#getGridById', () => {
    it('should return specified grid', () => {
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
          col: 3,
          size: '2:1',
          widgets: [],
          layouts: [],
          layout_grids: [],
          grid_widgets: [],
        },
      ];
      const id = 2;
      service.getGridById(id).subscribe((gridData) => {
        expect(gridData.name).toEqual('Test');
        expect(gridData.title).toEqual('Grid');
        expect(gridData.col).toBe(3);
        expect(gridData.size).toEqual('2:1');
      });
      const req = httpTestingController.expectOne(
        `${service.apiUrl}/grids/${id}.json`
      );
      req.flush(mockGrids[id - 1]);
    });
  });

  describe('#getWidgetById', () => {
    it('should return specified widget', () => {
      const mockWidgets = [
        { id: 1, name: 'Widget', results: [], config: config },
        { id: 2, name: 'Test', results: [], config: config },
      ];
      const id = 2;
      service.getWidgetById(id).subscribe((widgetData) => {
        expect(widgetData.name).toEqual('Test');
        expect(widgetData.config.widgetType).toEqual('line');
      });
      const req = httpTestingController.expectOne(
        `${service.apiUrl}/widgets/${id}.json`
      );
      req.flush(mockWidgets[id - 1]);
    });
  });

  describe('#createLayout', () => {
    it('should create correct layout', () => {
      const mockLayout = {
        id: 1,
        name: 'Test',
        background: 'white',
        duration: 0,
        grids: [],
        layout_grids: [],
      };
      service.createLayout(mockLayout).subscribe((data: Layout) => {
        expect(data.name).toEqual('Test');
        expect(data.background).toEqual('white');
        expect(data.duration).toBe(0);
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/layouts`);

      expect(req.request.method).toEqual('POST');

      req.flush(mockLayout);
    });
  });

  describe('#createGrid', () => {
    it('should create correct grid', () => {
      const mockGrid = {
        id: 1,
        name: 'Grid',
        title: 'Test',
        col: 2,
        size: '2:1',
        widgets: [],
        layouts: [],
        layout_grids: [],
        grid_widgets: [],
      };
      service.createGrid(mockGrid).subscribe((data: Grid) => {
        expect(data.name).toEqual('Grid');
        expect(data.title).toEqual('Test');
        expect(data.col).toBe(2);
        expect(data.size).toEqual('2:1');
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/grids`);

      expect(req.request.method).toEqual('POST');

      req.flush(mockGrid);
    });
  });

  describe('#createWidget', () => {
    it('should create correct widget', () => {
      const mockWidget = { id: 1, name: 'Widget', results: [], config: config };
      service.createWidget(mockWidget).subscribe((data: Widget) => {
        expect(data.name).toEqual('Widget');
        expect(data.config.widgetType).toEqual('line');
      });
      const req = httpTestingController.expectOne(`${service.apiUrl}/widgets`);

      expect(req.request.method).toEqual('POST');

      req.flush(mockWidget);
    });
  });

  describe('#createLayoutGrid', () => {
    it('should create correct layout-grid join', () => {
      const mockLG = { id: 1, position: 0, layout_id: 1, grid_id: 1 };
      service.createLayoutGrid(mockLG).subscribe((data: LayoutGrid) => {
        expect(data.position).toBe(0);
        expect(data.layout_id).toBe(1);
        expect(data.grid_id).toBe(1);
      });
      const req = httpTestingController.expectOne(
        `${service.apiUrl}/layout_grids`
      );

      expect(req.request.method).toEqual('POST');

      req.flush(mockLG);
    });
  });

  describe('#createGridWidget', () => {
    it('should create correct grid-widget join', () => {
      const mockGW = {
        id: 1,
        position: 0,
        length: 1,
        width: 1,
        grid_id: 1,
        widget_id: 1,
      };
      service.createGridWidget(mockGW).subscribe((data: GridWidget) => {
        expect(data.position).toBe(0);
        expect(data.grid_id).toBe(1);
        expect(data.widget_id).toBe(1);
      });
      const req = httpTestingController.expectOne(
        `${service.apiUrl}/grid_widgets`
      );

      expect(req.request.method).toEqual('POST');

      req.flush(mockGW);
    });
  });

  describe('#updateLayout', () => {
    it('should update specified layout', () => {
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
          duration: 3000,
          grids: [],
          layout_grids: [],
        },
      ];
      const id = 1;
      service.updateLayout(id, mockLayouts[id]).subscribe((data: Layout) => {
        expect(data.name).toEqual('Layout');
        expect(data.background).toEqual('white');
        expect(data.duration).toBe(3000);
      });
      const req = httpTestingController.expectOne(
        `${service.apiUrl}/layouts/${id}`
      );

      expect(req.request.method).toEqual('PUT');

      req.flush(mockLayouts[id]);
    });
  });

  describe('#updateGrid', () => {
    it('should update specified grid', () => {
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
          col: 3,
          size: '2:1',
          widgets: [],
          layouts: [],
          layout_grids: [],
          grid_widgets: [],
        },
      ];
      const id = 1;
      service.updateGrid(id, mockGrids[id]).subscribe((data: Grid) => {
        expect(data.name).toEqual('Test');
        expect(data.title).toEqual('Grid');
        expect(data.col).toBe(3);
        expect(data.size).toEqual('2:1');
      });
      const req = httpTestingController.expectOne(
        `${service.apiUrl}/grids/${id}`
      );

      expect(req.request.method).toEqual('PUT');

      req.flush(mockGrids[id]);
    });
  });

  describe('#updateWidget', () => {
    it('should update specified widget', () => {
      const mockWidgets = [
        { id: 1, name: 'Widget', results: [], config: config },
        { id: 2, name: 'Test', results: [], config: config },
      ];
      const id = 1;
      service.updateWidget(id, mockWidgets[id]).subscribe((data: Widget) => {
        expect(data.name).toEqual('Test');
        expect(data.config.widgetType).toEqual('line');
      });
      const req = httpTestingController.expectOne(
        `${service.apiUrl}/widgets/${id}`
      );

      expect(req.request.method).toEqual('PUT');

      req.flush(mockWidgets[id]);
    });
  });

  describe('#updateLayoutGrid', () => {
    it('should update specified layout-grid join', () => {
      const id = 1;
      const mockLG = { id: id, position: 3, layout_id: 1, grid_id: 2 };
      const targetLG = { id: id, position: 2, layout_id: 1, grid_id: 2 };
      service.updateLayoutGrid(targetLG).subscribe((data: LayoutGrid) => {
        expect(data.position).toBe(2);
      });
      const req = httpTestingController.expectOne(
        `${service.apiUrl}/layout_grids/${id}`
      );

      expect(req.request.method).toEqual('PUT');

      req.flush(targetLG);
    });
  });

  describe('#updateGridWidget', () => {
    it('should update specified grid-widget join', () => {
      const id = 1;
      const mockGW = {
        id: id,
        position: 3,
        length: 1,
        width: 1,
        grid_id: 2,
        widget_id: 3,
      };
      const targetGW = {
        id: id,
        position: 2,
        length: 1,
        width: 1,
        grid_id: 2,
        widget_id: 3,
      };
      service.updateGridWidget(targetGW).subscribe((data: GridWidget) => {
        expect(data.position).toBe(2);
      });
      const req = httpTestingController.expectOne(
        `${service.apiUrl}/grid_widgets/${id}`
      );

      expect(req.request.method).toEqual('PUT');

      req.flush(targetGW);
    });
  });

  describe('#delete methods', () => {
    const id = 15;
    it('should delete specified layout', () => {
      service.deleteLayout(id).subscribe();
      const req = httpTestingController.expectOne(
        `${service.apiUrl}/layouts/${id}`
      );
      expect(req.request.method).toEqual('DELETE');
      req.flush([]);
    });

    it('should delete specified grid', () => {
      service.deleteGrid(id).subscribe();
      const req = httpTestingController.expectOne(
        `${service.apiUrl}/grids/${id}`
      );
      expect(req.request.method).toEqual('DELETE');
      req.flush([]);
    });

    it('should delete specified widget', () => {
      service.deleteWidget(id).subscribe();
      const req = httpTestingController.expectOne(
        `${service.apiUrl}/widgets/${id}`
      );
      expect(req.request.method).toEqual('DELETE');
      req.flush([]);
    });

    it('should delete specified layoutgrid', () => {
      service.deleteLayoutGrid(id).subscribe();
      const req = httpTestingController.expectOne(
        `${service.apiUrl}/layout_grids/${id}`
      );
      expect(req.request.method).toEqual('DELETE');
      req.flush([]);
    });

    it('should delete specified gridwidget', () => {
      service.deleteGridWidget(id).subscribe();
      const req = httpTestingController.expectOne(
        `${service.apiUrl}/grid_widgets/${id}`
      );
      expect(req.request.method).toEqual('DELETE');
      req.flush([]);
    });
  });
});
