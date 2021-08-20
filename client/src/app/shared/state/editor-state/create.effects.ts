import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { ConfigService } from '../../config.service';
import * as fromActions from './create.actions';

@Injectable()
export class CreateEffects {
  createLayout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.createLayout),
      mergeMap((action) =>
        this.conf.createLayout(action.layout).pipe(
          map((layout) => fromActions.createLayoutSuccess({ layout: layout })),
          catchError(() => of(fromActions.createLayoutFail()))
        )
      )
    )
  );

  createLayoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.createLayoutSuccess),
        tap((res) => this.router.navigate(['/layouts', res.layout.id]))
      ),
    { dispatch: false }
  );

  createLayoutFail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.createLayoutFail),
      tap(() =>
        this.snackbar.open('Failed to create layout', 'Error', {
          duration: 2500,
        })
      )
    )
  );

  createGrid$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.createGrid),
      mergeMap((action) =>
        this.conf.createGrid(action.grid).pipe(
          map((grid) => fromActions.createGridSuccess({ grid: grid })),
          catchError(() => of(fromActions.createGridFail()))
        )
      )
    )
  );

  createGridSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.createGridSuccess),
        tap((res) => this.router.navigate(['/grids', res.grid.id]))
      ),
    { dispatch: false }
  );

  createGridFail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.createGridFail),
      tap(() =>
        this.snackbar.open('Failed to create grid', 'Error', {
          duration: 2500,
        })
      )
    )
  );

  createWidget$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.createWidget),
      mergeMap((action) =>
        this.conf.createWidget(action.widget).pipe(
          map((widget) => fromActions.createWidgetSuccess({ widget: widget })),
          catchError(() => of(fromActions.createWidgetFail()))
        )
      )
    )
  );

  createWidgetSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.createWidgetSuccess),
        tap((res) => this.router.navigate(['/widgets', res.widget.id]))
      ),
    { dispatch: false }
  );

  createWidgetFail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.createWidgetFail),
      tap(() =>
        this.snackbar.open('Failed to create widget', 'Error', {
          duration: 2500,
        })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private conf: ConfigService,
    private router: Router,
    private snackbar: MatSnackBar,
  ) {}
}
