import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
    yAxisLabel: string,
    widgetType: string
  };
}

export interface Grid {
  id: number;
  name: string;
  title: string;
  col: number;
  size: string;
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
     return this.http.get<Layout[]>(`${this.apiUrl}/layouts.json`)
      .pipe(
        catchError(this.handleError)
      );
   }

   getLayoutById(id: number) {
     return this.http.get<Layout>(`${this.apiUrl}/layouts/${id}.json`)
      .pipe(
        catchError(this.handleError)
      );
   }

   getGrids() {
    return this.http.get<Grid[]>(`${this.apiUrl}/grids.json`)
     .pipe(
       catchError(this.handleError)
     );
  }

   getGridById(id: number) {
     return this.http.get<Grid>(`${this.apiUrl}/grids/${id}.json`)
      .pipe(
        catchError(this.handleError)
    );
   }

   getWidgets() {
    return this.http.get<Widget[]>(`${this.apiUrl}/widgets.json`)
     .pipe(
       catchError(this.handleError)
     );
  }

   getWidgetById(id: number) {
     return this.http.get<Widget>(`${this.apiUrl}/widgets/${id}.json`)
      .pipe(
        catchError(this.handleError)
    );
   }

   createWidget(formData: Widget) {
    return this.http.post(`${this.apiUrl}/widgets`, formData)
      .pipe(
        catchError(this.handleError)
    );
   }

   createGrid(formData: Grid) {
    return this.http.post(`${this.apiUrl}/grids`, formData)
      .pipe(
        catchError(this.handleError)
    );
   }

   createLayout(formData: Layout) {
    return this.http.post(`${this.apiUrl}/layouts`, formData)
      .pipe(
        catchError(this.handleError)
    );
   }

   createLayoutGrid(data: LayoutGrid) {
     return this.http.post(`${this.apiUrl}/layout_grids`, data)
      .pipe(
        catchError(this.handleError)
      );
   }

   createGridWidget(data: GridWidget) {
    return this.http.post(`${this.apiUrl}/grid_widgets`, data)
     .pipe(
       catchError(this.handleError)
     );
  }

   updateWidget(id: number, formData: Widget) {
     return this.http.put(`${this.apiUrl}/widgets/${id}`, formData)
      .pipe(
        catchError(this.handleError)
      );
   }

   updateGrid(id: number, formData: Grid) {
    return this.http.put(`${this.apiUrl}/grids/${id}`, formData)
     .pipe(
       catchError(this.handleError)
     );
  }

  updateLayout(id: number, formData: Layout) {
    return this.http.put(`${this.apiUrl}/layouts/${id}`, formData)
     .pipe(
       catchError(this.handleError)
     );
  }

  updateLayoutGrid(data: LayoutGrid) {
    return this.http.put(`${this.apiUrl}/layout_grids/${data.id}`, data)
     .pipe(
       catchError(this.handleError)
     );
  }

  updateGridWidget(data: GridWidget) {
    return this.http.put(`${this.apiUrl}/grid_widgets/${data.id}`, data)
     .pipe(
       catchError(this.handleError)
     );
  }

  deleteWidget(id: number) {
    return this.http.delete(`${this.apiUrl}/widgets/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteGrid(id: number) {
    return this.http.delete(`${this.apiUrl}/grids/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteLayout(id: number) {
    return this.http.delete(`${this.apiUrl}/layouts/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteLayoutGrid(id: number) {
    return this.http.delete(`${this.apiUrl}/layout_grids/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteGridWidget(id: number) {
    return this.http.delete(`${this.apiUrl}/grid_widgets/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

   private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
