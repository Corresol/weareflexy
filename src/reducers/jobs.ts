import { Action as ReduxAction, combineReducers } from 'redux';
import { isType } from 'redux-typescript-actions';

import * as jobActions from '../actions/jobs';
import { Job } from "../services/jobs";

function byId(state: Dictionary<Job> = {}, action: ReduxAction) {
  
  // singles
  if (
    isType(action, jobActions.getJobAsync.done)
  ) {
    if (action.payload.result === null) return { ...state };
    state = {
      ...state,
      [action.payload.result.id]: action.payload.result
    };
  }

  return state;
}

export interface JobsState {
  byId: Dictionary<Job>;
}

export const jobsReducer = combineReducers<JobsState>({
  byId
});

