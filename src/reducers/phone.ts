import { Action as ReduxAction } from 'redux';
import { isType } from 'redux-typescript-actions';

import * as registrationActions from '../actions/registration';
import { Phone } from "../services/registration";

export type PhoneState = Phone | null;

export function phoneReducer(state: PhoneState = null, action: ReduxAction) {
  if (
      isType(action, registrationActions.createUnverifiedPhoneAsync.done) ||
      isType(action, registrationActions.confirmPhoneAsync.done)  
    ) {
    state = action.payload.result;
  }
  return state;
}
