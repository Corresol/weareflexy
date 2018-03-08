import actionCreatorFactory from 'redux-typescript-actions';

import { Authentication } from '../services/authentication';
import { CreateAccountDTO, RegistrationService, ConfirmPhoneDTO, Phone } from '../services/registration';
import { CredentialsService } from '../services/credentials';

const actionCreator = actionCreatorFactory();

export const createAccountAsync = actionCreator.async<CreateAccountDTO, Authentication>('CREATE_ACCOUNT');
export function createAccount(dto: CreateAccountDTO) {
  return async (dispatch) => {
    const regSvc = new RegistrationService();
    dispatch(createAccountAsync.started(dto));

    try {
      var result = await regSvc.createAccount(dto);
    } catch (e) {
      return dispatch(createAccountAsync.failed({ params: dto, error: e }));
    }

    if (result.status === 'success') return dispatch(createAccountAsync.done({ params: dto, result: result.data }));
    else return dispatch(createAccountAsync.failed({ params: dto, error: result.data }));
  }
}

export const confirmPhoneAsync = actionCreator.async<ConfirmPhoneDTO, Phone>('CONFIRM_PHONE');
export function confirmPhone(dto: ConfirmPhoneDTO) {
  return async (dispatch) => {
    const regSvc = new RegistrationService()

    dispatch(confirmPhoneAsync.started(dto));

    try {
      var result = await regSvc.confirmPhone(dto);
    } catch (error) {
      return dispatch(confirmPhoneAsync.failed({ params: dto, error }));
    }

    if (result.status === 'success') return dispatch(confirmPhoneAsync.done({ params: dto, result: result.data }));
    else return dispatch(confirmPhoneAsync.failed({ params: dto, error: result.data }));
  };
}

export const createUnverifiedPhoneAsync = actionCreator.async<{ phone: string }, Phone>('CREATE_PHONE');
export function createUnverifiedPhone(phone: string) {
  return async (dispatch) => {
    const regSvc = new RegistrationService();
    dispatch(createUnverifiedPhoneAsync.started({ phone }));

    try {
      var result = await regSvc.createUnverifiedPhone(phone);
    } catch (error) {
      return dispatch(createUnverifiedPhoneAsync.failed({ params: { phone }, error }));
    }

    if (result.status === 'success') return dispatch(createUnverifiedPhoneAsync.done({ params: { phone }, result: result.data }));
    else return dispatch(createUnverifiedPhoneAsync.failed({ params: { phone }, error: result.data }));
  };
}


export const getEmailAvailabilityAsync = actionCreator.async<string, { email: string, available: boolean }>('GET_EMAIL_AVAIL');
export function getEmailAvailability(email: string) {
  return async (dispatch) => {
    const credSvc = new CredentialsService();
    dispatch(getEmailAvailabilityAsync.started(email));
    try {
      var result = await credSvc.getEmailAvailability(email);
    } catch (error) {
      dispatch(getEmailAvailabilityAsync.failed({ params: email, error }));
      return null;
    }

    if (result.status === 'success') {
      dispatch(getEmailAvailabilityAsync.done({ params: email, result: result.data }));
      return result.data;
    }
    else {
      dispatch(getEmailAvailabilityAsync.failed({ params: email, error: result.data }));
      return null;
    }
  };
}
