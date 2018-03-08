import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';


import * as accountActions from '../actions/account';
import { workerAccountReducer } from '../reducers/workerAccount';
import { WorkerAccount } from '../services/registration';

const config = require('../config');

const mockStore = configureMockStore([thunk]);

const mockWorkerAcct = <WorkerAccount>{
  id: '684dd46a-7322-11e7-baa9-af64b364c85c',
  created: '2017-07-27T23:22:07.407Z',
  updated: '2017-08-15T20:39:58.070Z',
  version: 12,
  status: 'active',
  email: 'drewrathbone@gmail.com',
  firstName: 'Drew',
  lastName: 'Rathbone',
  photo: 'https://storage.googleapis.com/flexy-worker-profile-photos/9a61149b-fa82-4fcf-978f-d0e874d974b7',
  pendingPhoto: 'https://storage.googleapis.com/flexy-worker-profile-photos/9d6db4a5-0eb7-4f72-bd3e-1970fed8d553',
  phone: '07914376351'
};

describe('async account actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('getWorkerAccount', async () => {
    

    nock(config.apiBase)
      .get(`/account`)
      .reply(200, {
        status: 'success', data: mockWorkerAcct
      });

    const params = {};

    const expectedActions = [
      accountActions.getWorkerAccountAsync.started(params),
      accountActions.getWorkerAccountAsync.done({ params, result: mockWorkerAcct })
    ];

    const store = mockStore({ authentication: { accessToken: '' }, appoointments: {} });

    await store.dispatch(accountActions.getWorkerAccount());
    expect(store.getActions()).toEqual(expectedActions);

  });

});



describe('workerAccount reducer', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  const initialState = mockWorkerAcct;

  it('should update worker acct (getWorkerAccount)', async () => {
    expect(
      workerAccountReducer(initialState, accountActions.getWorkerAccountAsync.done({
        params: {},
        result: mockWorkerAcct
      }))
    ).toEqual(mockWorkerAcct);
  });


});


