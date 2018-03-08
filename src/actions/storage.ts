import actionCreatorFactory from 'redux-typescript-actions';

import { AppState } from '../reducers/index';
import { SignedUpload, StorageService } from "../services/storage";

const actionCreator = actionCreatorFactory();

export const signUploadAsync = actionCreator.async<{ contentType: string }, SignedUpload>('SIGN_UPLOAD');
export function signUpload(contentType: string) {
  return async (dispatch, getState: () => AppState) => {
    const state = getState();
    const storageSvc = new StorageService().useAccessToken(state.authentication.accessToken);

    dispatch(signUploadAsync.started({ contentType }));

    try {
      var result = await storageSvc.signUpload(contentType);
    } catch (error) {
      return dispatch(signUploadAsync.failed({ params: { contentType }, error }));
    }

    if (result.status === 'success') return dispatch(signUploadAsync.done({ params: { contentType }, result: result.data }));
    else return dispatch(signUploadAsync.failed({ params: { contentType }, error: result.data }));

  };
}

