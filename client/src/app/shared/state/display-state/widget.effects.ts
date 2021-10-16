import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ConfigService } from '../../config.service';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as fromActions from './widget.actions';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Widget } from '../../models/widget.model';

@Injectable()
export class WidgetEffects {
  loadWidgets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadWidgets),
      mergeMap(() =>
        this.conf.getWidgets().pipe(
          map((data) => fromActions.loadWidgetsSuccess({ widgets: data })),
          catchError(() => of(fromActions.loadWidgetsFail()))
        )
      )
    )
  );

  loadWidgetsFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.loadWidgetsFail),
        tap(() =>
          this.snackbar.open('Failed to fetch widgets', 'Error', {
            duration: 2500,
          })
        )
      ),
    { dispatch: false }
  );

  deleteWidget$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.deleteWidget),
      mergeMap((action) =>
        this.conf.deleteWidget(action.id).pipe(
          map(() => fromActions.deleteWidgetSuccess({ id: action.id })),
          catchError(() => of(fromActions.deleteWidgetFail()))
        )
      )
    )
  );

  deleteWidgetsFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.deleteWidgetFail),
        tap(() =>
          this.snackbar.open('Failed to delete widget', 'Error', {
            duration: 2500,
          })
        )
      ),
    { dispatch: false }
  );

  fetchWidget$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.fetchWidget),
      mergeMap((action) =>
        this.conf.getWidgetById(action.id).pipe(
          map((widget) => fromActions.fetchWidgetSuccess({ widget: widget })),
          catchError(() => of(fromActions.fetchWidgetFail()))
        )
      )
    )
  );

  fetchWidgetFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.fetchWidgetFail),
        tap(() =>
          this.snackbar.open('Failed to fetch widget', 'Error', {
            duration: 2500,
          })
        )
      ),
    { dispatch: false }
  );

  updateWidget$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.updateWidget),
      mergeMap((action) => {
        const widget = action.update.changes as Widget;
        return this.conf.updateWidget(+action.update.id, widget).pipe(
          map(() => fromActions.updateWidgetSuccess({ update: action.update })),
          catchError(() => of(fromActions.updateWidgetFail()))
        );
      })
    )
  );

  updateWidgetFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.updateWidgetFail),
        tap(() =>
          this.snackbar.open('Failed to update widget', 'Error', {
            duration: 2500,
          })
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private conf: ConfigService,
    private snackbar: MatSnackBar
  ) {}
}
