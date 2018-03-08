import actionCreatorFactory from 'redux-typescript-actions';

import { AppState } from "../reducers/index";
import { Job, JobsService, JobCategory, GetConflictingSchedulesOutput, BookSchedulesDTO } from "../services/jobs";

const actionCreator = actionCreatorFactory();

export const getJobCategoriesAsync = actionCreator.async<{}, JobCategory[]>('GET_JOB_CATEGORIES');
export function getJobCategories() {
  return async (dispatch, getState: () => AppState) => {
    const state = getState();
    const jobsSvc = new JobsService().useAccessToken(state.authentication.accessToken);
    const params = {};
    dispatch(getJobCategoriesAsync.started(params));

    try {
      var result = await jobsSvc.getJobCategories();
    } catch (e) {
      return dispatch(getJobCategoriesAsync.failed({ params, error: e }));
    }

    if (result.status === 'success') return dispatch(getJobCategoriesAsync.done({ params, result: result.data }));
    else return dispatch(getJobCategoriesAsync.failed({ params, error: result.data }));
  };
}

export const getJobAsync = actionCreator.async<{ jobId: string }, Job>('GET_JOB');
export function getJob(jobId: string) {
  return async (dispatch, getState: () => AppState) => {
    const state = getState();
    const jobsSvc = new JobsService().useAccessToken(state.authentication.accessToken);
    const params = { jobId };
    dispatch(getJobAsync.started(params));

    try {
      var result = await jobsSvc.getJob(params.jobId);
    } catch (e) {
      return dispatch(getJobAsync.failed({ params, error: e }));
    }

    if (result.status === 'success') return dispatch(getJobAsync.done({ params, result: result.data }));
    else return dispatch(getJobAsync.failed({ params, error: result.data }));
  };
}

export const getConflictingSchedulesAsync = 
  actionCreator.async<{ jobId: string, selectedScheduleIds: string[] }, GetConflictingSchedulesOutput>('GET_CONFLICTING_SCHEDULES');
export function getConflictingSchedules(jobId: string, selectedScheduleIds: string[]) {
  return async (dispatch, getState: () => AppState) => {
    const state = getState();
    const jobsSvc = new JobsService().useAccessToken(state.authentication.accessToken);
    const params = { jobId, selectedScheduleIds };
    dispatch(getConflictingSchedulesAsync.started(params));

    try {
      var result = await jobsSvc.getConflictingSchedules(params.jobId, params.selectedScheduleIds);
    } catch (e) {
      return dispatch(getConflictingSchedulesAsync.failed({ params, error: e }));
    }

    if (result.status === 'success') return dispatch(getConflictingSchedulesAsync.done({ params, result: result.data }));
    else return dispatch(getConflictingSchedulesAsync.failed({ params, error: result.data }));
  };
}

export const bookSchedulesAsync = actionCreator.async<{ jobId: string, dto: BookSchedulesDTO }, {}>('BOOK_SCHEDULES');
export function bookSchedules(jobId: string, dto: BookSchedulesDTO) {
  return async (dispatch, getState: () => AppState) => {
    const state = getState();
    const jobsSvc = new JobsService().useAccessToken(state.authentication.accessToken);
    const params = { jobId, dto };
    dispatch(bookSchedulesAsync.started(params));
    
    try {
      var result = await jobsSvc.bookSchedules(params.jobId, params.dto);
    } catch (e) {
      return dispatch(bookSchedulesAsync.failed({ params, error: e }));
    }

    if (result.status === 'success') return dispatch(bookSchedulesAsync.done({ params, result: result.data }));
    else return dispatch(bookSchedulesAsync.failed({ params, error: result.data }));
  };
}


export const replyInterestedAsync = actionCreator.async<{ jobAlertId: string }, {}>('REPLY_JOB_ALERT_INTERESTED');
export function replyInterested(jobAlertId: string) {
  return async (dispatch, getState: () => AppState) => {
    const state = getState();
    const jobsSvc = new JobsService().useAccessToken(state.authentication.accessToken);
    const params = { jobAlertId };
    dispatch(replyInterestedAsync.started(params));
    
    try {
      var result = await jobsSvc.replyJobAlert(params.jobAlertId, { interested: true });
    } catch (e) {
      return dispatch(replyInterestedAsync.failed({ params, error: e }));
    }

    if (result.status === 'success') return dispatch(replyInterestedAsync.done({ params, result: result.data }));
    else return dispatch(replyInterestedAsync.failed({ params, error: result.data }));
  };
}

export const replyNotInterestedAsync = actionCreator.async<{ jobAlertId: string, reasonIds: null | string[] }, {}>('REPLY_JOB_ALERT_NOT_INTERESTED');
export function replyNotInterested(jobAlertId: string, reasonIds: null | string[]) {
  return async (dispatch, getState: () => AppState) => {
    const state = getState();
    const jobsSvc = new JobsService().useAccessToken(state.authentication.accessToken);
    const params = { jobAlertId, reasonIds };
    dispatch(replyNotInterestedAsync.started(params));
    
    try {
      var result = await jobsSvc.replyJobAlert(params.jobAlertId, { interested: false, reasonIds });
    } catch (e) {
      return dispatch(replyNotInterestedAsync.failed({ params, error: e }));
    }

    if (result.status === 'success') return dispatch(replyNotInterestedAsync.done({ params, result: result.data }));
    else return dispatch(replyNotInterestedAsync.failed({ params, error: result.data }));
  };
}

