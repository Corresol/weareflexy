import actionCreatorFactory from 'redux-typescript-actions';

import { WorkerAccount } from '../services/registration';
import { ProfileService } from '../services/profile';
import { AppState } from "../reducers/index";

const actionCreator = actionCreatorFactory();

export const setPersonalStatementAsync = actionCreator.async<{ personalStatement: string }, WorkerAccount>('SET_PERSONAL_STATEMENT');
export function setPersonalStatement(personalStatement: string) {
  return async (dispatch, getState: () => AppState) => {
    const state = getState();
    const profileSvc = new ProfileService().useAccessToken(state.authentication.accessToken);
    const params = { personalStatement };
    dispatch(setPersonalStatementAsync.started(params));

    try {
      var result = await profileSvc.setPersonalStatement(params);
    } catch (e) {
      return dispatch(setPersonalStatementAsync.failed({ params, error: e }));
    }

    if (result.status === 'success') return dispatch(setPersonalStatementAsync.done({ params, result: result.data }));
    else return dispatch(setPersonalStatementAsync.failed({ params, error: result.data }));
  }
}