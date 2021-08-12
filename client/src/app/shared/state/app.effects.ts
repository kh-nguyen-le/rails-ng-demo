import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ConfigService } from '../config.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as fromActions from './app.actions';
import { of } from 'rxjs';

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

  constructor(private actions$: Actions, private conf: ConfigService) {}
}
