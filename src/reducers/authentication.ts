import { Action as ReduxAction } from 'redux';
import { isType } from 'redux-typescript-actions';

import * as registrationActions from '../actions/registration';
import * as authenticationActions from '../actions/authentication';
import { JwtTokenPair } from '../types';

export type AuthenticationState = JwtTokenPair | null;

export function authenticationReducer(state: AuthenticationState = null, action: ReduxAction) {
  if (
    isType(action, registrationActions.createAccountAsync.done)  ||
    isType(action, authenticationActions.loginAsync.done)
  ) {
    state = action.payload.result.tokens;
  }
  return state;
}
