import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { CableService } from '../../cable.service';
import * as fromActions from './cable.actions';

@Injectable()
export class CableEffects {
  connect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.connect),
        tap(() => this.cs.joinSynchro())
      ),
    { dispatch: false }
  );

  sendLayout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.sendLayout),
        tap((action) => { 
          this.cs.channel.send(action.layout);
          this.cs.log('sent layout');
        })
      ),
    { dispatch: false }
  );

  sendGrid$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.sendGrid),
        tap((action) => {
          this.cs.channel.send(action.grid);
          this.cs.log('sent grid');
        })
      ),
    { dispatch: false }
  );

  sendWidget$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.sendWidget),
        tap((action) => { 
          this.cs.channel.send(action.widget);
          this.cs.log('sent widget');
        })
      ),
    { dispatch: false }
  );


  constructor(private actions$: Actions, private cs: CableService) {}
}
