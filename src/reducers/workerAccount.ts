import { Action as ReduxAction } from 'redux';
import { isType } from 'redux-typescript-actions';

import * as registrationActions from '../actions/registration';
import * as authenticationActions from '../actions/authentication';
import * as accountActions from '../actions/account';
import * as profileActions from '../actions/profile';

import { WorkerAccount } from '../services/registration';

export type WorkerAccountState = WorkerAccount | null;

export function workerAccountReducer(state: WorkerAccountState = null, action: ReduxAction) {

  // .workerAccount
  if (
    isType(action, registrationActions.createAccountAsync.done) ||
    isType(action, authenticationActions.loginAsync.done)
  ) {
    state = action.payload.result.workerAccount;
  }

  // rawdog
  if (
    isType(action, accountActions.getWorkerAccountAsync.done) ||
    isType(action, profileActions.setPersonalStatementAsync.done)
  ) {
    state = action.payload.result;
  }

  // laters
  if (
    isType(action, authenticationActions.logoutAsync.done)
  ) {
    state = null;
  }
  return state;
}
