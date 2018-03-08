import actionCreatorFactory from 'redux-typescript-actions';
import { WorkerAccount } from '../services/registration';
import { AppState } from '../reducers/index';
import { AccountService } from '../services/account';

const actionCreator = actionCreatorFactory();


export const getWorkerAccountAsync = actionCreator.async<{}, WorkerAccount | null>('AUTH_GET_CURRENT');
export function getWorkerAccount() {
  return async (dispatch, getState: () => AppState) => {
    const state = getState();

    const acctSvc = new AccountService().useAccessToken(state.authentication.accessToken);
    dispatch(getWorkerAccountAsync.started({}));

    try {
      var result = await acctSvc.getWorkerAccount();
    } catch (error) {
      return dispatch(getWorkerAccountAsync.failed({ params: {}, error }));
    }

    if (result.status === 'success') return dispatch(getWorkerAccountAsync.done({ params: {}, result: result.data }));
    else return dispatch(getWorkerAccountAsync.done({ params: {}, result: null }));
  }
}