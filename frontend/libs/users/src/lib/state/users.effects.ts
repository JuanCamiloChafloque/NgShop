import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { catchError, concatMap, map, of } from 'rxjs';
import { UsersService } from '../services/users.service';

import * as UsersActions from './users.actions';
import * as UsersFeature from './users.reducer';

@Injectable()
export class UsersEffects {
  buildUserSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.buildUserSession),
      concatMap(() => {
        if (this.usersService.isTokenValid()) {
          return this.usersService.getLoggedInUser().pipe(
            map((user) => {
              return UsersActions.buildUserSessionSuccess({ user: user });
            }),
            catchError(() => of(UsersActions.buildUserSessionFailed()))
          );
        } else {
          return of(UsersActions.buildUserSessionFailed());
        }
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private usersService: UsersService
  ) {}
}
