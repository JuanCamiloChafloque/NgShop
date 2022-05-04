import { createReducer, on, Action } from '@ngrx/store';
import { User } from '../models/User';

import * as UsersActions from './users.actions';

export const USERS_FEATURE_KEY = 'users';

export interface UsersState {
  user: User;
  isAuthenticated: boolean;
}

export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: UsersState;
}

export const initialUserState: UsersState = {
  user: {},
  isAuthenticated: false,
};

const usersReducer = createReducer(
  initialUserState,
  on(UsersActions.buildUserSession, (state) => ({ ...state })),
  on(UsersActions.buildUserSessionSuccess, (state, action) => ({
    ...state,
    user: action.user,
    isAuthenticated: true,
  })),
  on(UsersActions.buildUserSessionFailed, (state) => ({
    ...state,
    user: {},
    isAuthenticated: false,
  }))
);

export function reducer(state: UsersState | undefined, action: Action) {
  return usersReducer(state, action);
}
