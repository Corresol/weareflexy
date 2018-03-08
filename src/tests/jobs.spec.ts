import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import * as jobsActions from '../actions/jobs';
import { Job, JobCategory } from '../services/jobs';
import { jobsReducer } from '../reducers/jobs';
import { jobCategoriesReducer } from '../reducers/jobCategories';

const config = require('../config');

const mockStore = configureMockStore([thunk]);

const mockJob = <Job>{
  id: '84dbaeaf-e484-49ef-840a-c848c6cbe317'
};

const mockScheduleIds = ['84dbaeaf-e484-49ef-840a-c848c6cbe312', '78dbaeaf-e484-49ef-840a-c848c6cbe312'];

const mockJobAlert = {
  id: '84dbaeaf-e484-49ef-840a-c848c6cbe315'
};

const mockJobCategory = <JobCategory>{
  id: '84dbaeaf-e484-49ef-840a-c848c6cbe319'
};

describe('async jobs actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('getJob', async () => {
    nock(config.apiBase)
      .get(`/jobs/${mockJob.id}`)
      .reply(200, {
        status: 'success', data: mockJob
      });

    const params = { jobId: mockJob.id };

    const expectedActions = [
      jobsActions.getJobAsync.started(params),
      jobsActions.getJobAsync.done({ params, result: mockJob })
    ];

    const store = mockStore({ authentication: { accessToken: '' }, jobs: { byId: {} } });

    await store.dispatch(jobsActions.getJob(params.jobId));
    expect(store.getActions()).toEqual(expectedActions);

  });

  it('getJobCategories', async () => {

    nock(config.apiBase)
      .get('/jobs/categories')
      .query(true)
      .reply(200, {
        status: 'success', data: [mockJobCategory]
      });

    const params = {};

    const expectedActions = [
      jobsActions.getJobCategoriesAsync.started(params),
      jobsActions.getJobCategoriesAsync.done({ params, result: [mockJobCategory] })
    ];
    const store = mockStore({ authentication: { accessToken: '' }, jobCategories: {} });

    await store.dispatch(jobsActions.getJobCategories());
    expect(store.getActions()).toEqual(expectedActions);

  });

  it('getConflictingSchedules', async () => {
    nock(config.apiBase)
      .get(`/jobs/${mockJob.id}/conflicts`)
      .query(true)
      .reply(200, {
        status: 'success',
        data: {
          conflictedScheduleIds: [mockScheduleIds[1]]
        }
      });
    
    const params = { jobId: mockJob.id, selectedScheduleIds: [mockScheduleIds[0]] };
    
    const expectedActions = [
      jobsActions.getConflictingSchedulesAsync.started(params),
      jobsActions.getConflictingSchedulesAsync.done({ 
        params, 
        result: {
          conflictedScheduleIds: [mockScheduleIds[1]] 
        }
      })
    ];
    
    const store = mockStore({ authentication: { accessToken: '' } });
    await store.dispatch(jobsActions.getConflictingSchedules(params.jobId, params.selectedScheduleIds));

    expect(store.getActions()).toEqual(expectedActions);

  });


  it('bookSchedules', async () => {
    nock(config.apiBase)
      .post(`/jobs/${mockJob.id}/schedules`)
      .query(true)
      .reply(200, {
        status: 'success',
        data: {}
      });
    
    const params = { jobId: mockJob.id, dto: { scheduleIds: mockScheduleIds, jobVersion: mockJob.version } };
    
    const expectedActions = [
      jobsActions.bookSchedulesAsync.started(params),
      jobsActions.bookSchedulesAsync.done({ params, result: {} })
    ];
    
    const store = mockStore({ authentication: { accessToken: '' } });
    await store.dispatch(jobsActions.bookSchedules(params.jobId, params.dto));

    expect(store.getActions()).toEqual(expectedActions);

  });




  it('replyInterested', async () => {
    nock(config.apiBase)
      .put(`/jobs/alerts/${mockJobAlert.id}`)
      .query(true)
      .reply(200, {
        status: 'success',
        data: {}
      });
    
    const params = { jobAlertId: mockJobAlert.id };
    
    const expectedActions = [
      jobsActions.replyInterestedAsync.started(params),
      jobsActions.replyInterestedAsync.done({ params, result: {} })
    ];
    
    const store = mockStore({ authentication: { accessToken: '' } });
    await store.dispatch(jobsActions.replyInterested(params.jobAlertId));

    expect(store.getActions()).toEqual(expectedActions);

  });

  it('replyNotInterested', async () => {
    nock(config.apiBase)
      .put(`/jobs/alerts/${mockJobAlert.id}`)
      .query(true)
      .reply(200, {
        status: 'success',
        data: {}
      });
    
    const params = { jobAlertId: mockJobAlert.id, reasonIds: null };
    
    const expectedActions = [
      jobsActions.replyNotInterestedAsync.started(params),
      jobsActions.replyNotInterestedAsync.done({ params, result: {} })
    ];
    
    const store = mockStore({ authentication: { accessToken: '' } });
    await store.dispatch(jobsActions.replyNotInterested(params.jobAlertId, params.reasonIds));

    expect(store.getActions()).toEqual(expectedActions);

  });

});



describe('jobsReducer', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  const initialState = {
    byId: {}
  };

  it('should return initial state', async () => {
    expect(jobsReducer(undefined, { type: 'TEST' })).toEqual(initialState);
  });

  it('should index jobs by id (getJob)', async () => {
    expect(
      jobsReducer(initialState, jobsActions.getJobAsync.done({
        params: {} as any,
        result: mockJob
      }))
        .byId
    ).toEqual({
      [mockJob.id]: mockJob
    });
  });

});


describe('jobCategoriesReducer', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  const initialState = {
    byId: {}
  };

  it('should return initial state', async () => {
    expect(jobCategoriesReducer(undefined, { type: 'TEST' })).toEqual(initialState);
  });

  it('should index job categories by id (getJobCategories)', async () => {
    expect(
      jobCategoriesReducer(initialState, jobsActions.getJobCategoriesAsync.done({
        params: {} as any,
        result: [mockJobCategory]
      }))
        .byId
    ).toEqual({
      [mockJobCategory.id]: mockJobCategory
    });
  });


});

