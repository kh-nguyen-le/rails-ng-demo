import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ConfigService } from '../../config.service';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as fromActions from './grid.actions';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Grid } from '../../models/grid.model';

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

  fetchGrid$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.fetchGrid),
      mergeMap((action) =>
        this.conf.getGridById(action.id).pipe(
          map((grid) => fromActions.fetchGridSuccess({ grid: grid })),
          catchError(() => of(fromActions.fetchGridFail()))
        )
      )
    )
  );

  fetchGridFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.fetchGridFail),
        tap(() =>
          this.snackbar.open('Failed to fetch grid', 'Error', {
            duration: 2500,
          })
        )
      ),
    { dispatch: false }
  );

  updateGrid$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.updateGrid),
      mergeMap((action) => {
        const grid = action.update.changes as Grid;
        return this.conf.updateGrid(+action.update.id, grid).pipe(
          map(() => fromActions.updateGridSuccess({ update: action.update })),
          catchError(() => of(fromActions.updateGridFail()))
        );
      })
    )
  );

  updateGridFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.updateGridFail),
        tap(() =>
          this.snackbar.open('Failed to update grid', 'Error', {
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
