import actionCreatorFactory from 'redux-typescript-actions';

import { RtwDocumentDTO, RtwDocument, RtwDocumentsService } from '../services/rtwDocuments';
import { AppState } from '../reducers/index';

const actionCreator = actionCreatorFactory();

export const getRtwDocumentsAsync = actionCreator.async<{}, RtwDocument[]>('GET_RTW_DOCS');
export function getRtwDocuments() {
  return async (dispatch, getState: () => AppState) => {
    const state = getState();
    const rtwDocumentsSvc = new RtwDocumentsService().useAccessToken(state.authentication.accessToken);

    dispatch(getRtwDocumentsAsync.started({}));

    try {
      var result = await rtwDocumentsSvc.getRtwDocuments();
    } catch (error) {
      return dispatch(getRtwDocumentsAsync.failed({ params: {}, error }));
    }

    if (result.status === 'success') return dispatch(getRtwDocumentsAsync.done({ params: { }, result: result.data }));
    else return dispatch(getRtwDocumentsAsync.failed({ params: { }, error: result.data }));

  };
}


export const createRtwDocumentAsync = actionCreator.async<RtwDocumentDTO, RtwDocument>('CREATE_RTW_DOC');
export function createRtwDocument(dto: RtwDocumentDTO) {
    return async (dispatch, getState: () => AppState) => {
      const state = getState();      
      const rtwDocumentsSvc = new RtwDocumentsService().useAccessToken(state.authentication.accessToken);
      const params = dto;
      dispatch(createRtwDocumentAsync.started(params));

      try {
        var result = await rtwDocumentsSvc.createRtwDocument(dto);    
      } catch (error) {
        return dispatch(createRtwDocumentAsync.failed({ params, error }));
      }

      if (result.status === 'success') return dispatch(createRtwDocumentAsync.done({ params, result: result.data }));
      else return dispatch(createRtwDocumentAsync.failed({ params, error: result.data }));

    }
}

