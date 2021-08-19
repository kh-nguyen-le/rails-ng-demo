import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ConfigService } from '../../config.service';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as fromActions from './layout.actions';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class LayoutEffects {
  loadLayouts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadLayouts),
      mergeMap(() =>
        this.conf.getLayouts().pipe(
          map((data) => fromActions.loadLayoutsSuccess({ layouts: data })),
          catchError(() => of(fromActions.loadLayoutsFail()))
        )
      )
    )
  );

  loadLayoutsFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.loadLayoutsFail),
        tap(() =>
          this.snackbar.open('Failed to fetch layouts', 'Error', {
            duration: 2500,
          })
        )
      ),
    { dispatch: false }
  );

  deleteLayout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.deleteLayout),
      mergeMap((action) =>
        this.conf.deleteLayout(action.id).pipe(
          map(() => fromActions.deleteLayoutSuccess({ id: action.id })),
          catchError(() => of(fromActions.deleteLayoutFail()))
        )
      )
    )
  );

  deleteLayoutsFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.deleteLayoutFail),
        tap(() =>
          this.snackbar.open('Failed to delete layout', 'Error', {
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
