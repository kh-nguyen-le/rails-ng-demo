import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Widget } from './models/widget.model';
import { Grid } from './models/grid.model';
import { GridWidget } from './models/gridwidget.model';
import { Layout } from './models/layout.model';
import { LayoutGrid } from './models/layoutgrid.model';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getLayouts(): Observable<Layout[]> {
    return this.http.get<Layout[]>(`${this.apiUrl}/layouts.json`);
  }

  getLayoutById(id: number): Observable<Layout> {
    return this.http.get<Layout>(`${this.apiUrl}/layouts/${id}.json`);
  }

  getGrids(): Observable<Grid[]> {
    return this.http.get<Grid[]>(`${this.apiUrl}/grids.json`);
  }

  getGridById(id: number): Observable<Grid> {
    return this.http.get<Grid>(`${this.apiUrl}/grids/${id}.json`);
  }

  getWidgets(): Observable<Widget[]> {
    return this.http.get<Widget[]>(`${this.apiUrl}/widgets.json`);
  }

  getWidgetById(id: number): Observable<Widget> {
    return this.http
      .get<Widget>(`${this.apiUrl}/widgets/${id}.json`)
      .pipe(catchError(this.handleError));
  }

  createWidget(formData: Widget): Observable<Widget> {
    return this.http.post<Widget>(`${this.apiUrl}/widgets`, formData);
  }

  createGrid(formData: Grid): Observable<Grid> {
    return this.http.post<Grid>(`${this.apiUrl}/grids`, formData);
  }

  createLayout(formData: Layout): Observable<Layout> {
    return this.http.post<Layout>(`${this.apiUrl}/layouts`, formData);
  }

  createLayoutGrid(data: LayoutGrid): Observable<LayoutGrid> {
    return this.http.post<LayoutGrid>(`${this.apiUrl}/layout_grids`, data);
  }

  createGridWidget(data: GridWidget): Observable<GridWidget> {
    return this.http
      .post<GridWidget>(`${this.apiUrl}/grid_widgets`, data)
      .pipe(catchError(this.handleError));
  }

  updateWidget(id: number, formData: Widget): Observable<Widget> {
    return this.http
      .put<Widget>(`${this.apiUrl}/widgets/${id}`, formData)
      .pipe(catchError(this.handleError));
  }

  updateGrid(id: number, formData: Grid): Observable<Grid> {
    return this.http.put<Grid>(`${this.apiUrl}/grids/${id}`, formData);
  }

  updateLayout(id: number, formData: Layout): Observable<Layout> {
    return this.http.put<Layout>(`${this.apiUrl}/layouts/${id}`, formData);
  }

  updateLayoutGrid(data: LayoutGrid): Observable<LayoutGrid> {
    return this.http.put<LayoutGrid>(
      `${this.apiUrl}/layout_grids/${data.id}`,
      data
    );
  }

  updateGridWidget(data: GridWidget): Observable<GridWidget> {
    return this.http
      .put<GridWidget>(`${this.apiUrl}/grid_widgets/${data.id}`, data)
      .pipe(catchError(this.handleError));
  }

  deleteWidget(id: number): Observable<Widget> {
    return this.http.delete<Widget>(`${this.apiUrl}/widgets/${id}`);
  }

  deleteGrid(id: number): Observable<Grid> {
    return this.http.delete<Grid>(`${this.apiUrl}/grids/${id}`);
  }

  deleteLayout(id: number): Observable<Layout> {
    return this.http.delete<Layout>(`${this.apiUrl}/layouts/${id}`);
  }

  deleteLayoutGrid(id: number): Observable<LayoutGrid> {
    return this.http.delete<LayoutGrid>(`${this.apiUrl}/layout_grids/${id}`);
  }

  deleteGridWidget(id: number): Observable<GridWidget> {
    return this.http.delete<GridWidget>(`${this.apiUrl}/grid_widgets/${id}`);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
