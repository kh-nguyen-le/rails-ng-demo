import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

export interface Widget {
  id: number;
  name: string;
  results: any;
  config: {
    gradient: string,
    autoscale: string,
    showXAsix: string,
    showYAxis: string,
    showXAxisLabel: string,
    showYAxisLabel: string,
    showLegend: string,
    xAxisLabel: string,
    yAxisLbael: string,
    widgetType: string
  }
}

export interface Grid {
  id: number;
  name: string;
  title: string;
  widgets: Widget[];
  layouts: Layout[];
  layout_grids: LayoutGrid[];
  grid_widgets: GridWidget[];
}

export interface Layout {
  id: number;
  name: string;
  background: string;
  duration: number;
  grids: Grid[];
  layout_grids: LayoutGrid[];
}

export interface LayoutGrid {
  id: number;
  position: number;
  layout_id: number;
  grid_id: number;
}

export interface GridWidget {
  id: number;
  position: number;
  length: number;
  width: number;
  grid_id: number;
  widget_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {

   }

   getLayouts() {
     return this.http.get<Layout[]>(`${this.apiUrl}/layouts.json`);
   }

}
