import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ConfigService } from '../../config.service';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as fromActions from './widget.actions';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(
    private actions$: Actions,
    private conf: ConfigService,
    private snackbar: MatSnackBar
  ) {}
}
