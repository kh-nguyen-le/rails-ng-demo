import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ConfigService } from '../../config.service';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as fromActions from './grid.actions';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class GridEffects {
  loadGrids$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadGrids),
      mergeMap(() =>
        this.conf.getGrids().pipe(
          map((data) => fromActions.loadGridsSuccess({ grids: data })),
          catchError(() => of(fromActions.loadGridsFail()))
        )
      )
    )
  );

  loadGridsFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.loadGridsFail),
        tap(() =>
          this.snackbar.open('Failed to fetch grids', 'Error', {
            duration: 2500,
          })
        )
      ),
    { dispatch: false }
  );

  deleteGrid$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.deleteGrid),
      mergeMap((action) =>
        this.conf.deleteGrid(action.id).pipe(
          map(() => fromActions.deleteGridSuccess({ id: action.id })),
          catchError(() => of(fromActions.deleteGridFail()))
        )
      )
    )
  );

  deleteGridsFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.deleteGridFail),
        tap(() =>
          this.snackbar.open('Failed to delete grid', 'Error', {
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
