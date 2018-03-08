import { Action as ReduxAction } from 'redux';
import { isType } from 'redux-typescript-actions';
import { keyBy, maxBy } from 'lodash';
import moment from 'moment';

import * as rtwDocumentsAction from '../actions/rtwDocuments';
import { RtwDocument } from "../services/rtwDocuments";

export type RtwDocumentsState = { 
  byId: { 
    [id: string]: RtwDocument 
  }, 
  latestId: string | null 
};

export function rtwDocumentsReducer(state: RtwDocumentsState = { byId: {}, latestId: null }, action: ReduxAction) {
  if (
    isType(action, rtwDocumentsAction.createRtwDocumentAsync.done)
  ) {
    state = { ...state };
    state.byId[action.payload.result.id] = action.payload.result;
    state.latestId = action.payload.result.id;
  }
  if (isType(action, rtwDocumentsAction.getRtwDocumentsAsync.done)) {
    state = {
      ...state,
      byId: keyBy(action.payload.result, (i) => i.id),
      latestId: maxBy(action.payload.result, (i) => moment(i.created).unix()).id
    };
  }
  return state;
}
