import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ConfigService } from '../config.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as fromActions from './app.actions';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class RootEffects {
  loadLayouts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadLayouts),
      mergeMap(() =>
        this.conf.getLayouts().pipe(
          map((data) => fromActions.loadLayoutsSuccess({ layouts: data })),
          catchError(() => of(fromActions.loadLayoutsFail))
        )
      )
    )
  );

  loadLayoutsFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.loadLayoutsFail),
        map(() => {
          setTimeout(
            () =>
              this.snackbar.open('Failed to fetch layouts', 'Error', {
                duration: 2500,
              }),
            0
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private conf: ConfigService,
    private snackbar: MatSnackBar
  ) {}
}
