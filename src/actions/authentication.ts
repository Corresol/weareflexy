import actionCreatorFactory from 'redux-typescript-actions';

import { Authentication, Logout, AuthenticationService } from '../services/authentication';

const actionCreator = actionCreatorFactory();


export const loginAsync = actionCreator.async<{ email: string, password: string }, Authentication | null>('AUTH_LOGIN');
export function login(email: string, password: string) {
  return async (dispatch) => {
    const authSvc = new AuthenticationService();
    dispatch(loginAsync.started({ email, password }));

    try {
      var result = await authSvc.authenticate(email, password);
    } catch (e) {
      return dispatch(loginAsync.failed({ params: { email, password }, error: e }));
    }

    if (result.status === 'success') return dispatch(loginAsync.done({ params: { email, password }, result: result.data }));
    else return dispatch(loginAsync.failed({ params: { email, password }, error: result.data }));
  }
}

export const logoutAsync = actionCreator.async<{}, Logout>('AUTH_LOGOUT');
export function logout() {
    return async (dispatch, getState) => {
      const state = getState();
      const authSvc = new AuthenticationService().useAccessToken(state.authentication.accessToken);

      dispatch(logoutAsync.started({}));

      try {
        var result = await authSvc.logout();
      } catch (error) {
        return dispatch(logoutAsync.failed({ params: {}, error }));
      }

      if (result.status === 'success') return dispatch(logoutAsync.done({ params: {}, result: result.data }));
      else return dispatch(logoutAsync.failed({ params: {}, error: result.data }));

    }
}


