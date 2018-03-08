import { Action as ReduxAction, combineReducers } from 'redux';
import { isType } from 'redux-typescript-actions';
import { keyBy } from 'lodash';

import * as jobActions from '../actions/jobs';
import { JobCategory } from "../services/jobs";

function byId(state: Dictionary<JobCategory> = {}, action: ReduxAction) {
  
  if (
    isType(action, jobActions.getJobCategoriesAsync.done)
  ) {
    if (action.payload.result === null) return { ...state };
    state = {
      ...state,
      ...keyBy(action.payload.result, 'id')
    };
  }

  return state;
}

export interface JobCategoriesState {
  byId: Dictionary<JobCategory>;
}

export const jobCategoriesReducer = combineReducers<JobCategoriesState>({
  byId
});

