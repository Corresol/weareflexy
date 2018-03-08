import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import * as storageActions from '../actions/storage';

const config = require('../config');

const mockStore = configureMockStore([thunk]);

const mockSignedUpload = {
  uploadUrl: 'dummyuploadurl',
  downloadUrl: 'dummydownloadurl',
  fileId: 'flexy-worker-uploads/84dbaeaf-e484-49ef-840a-c848c6cbe317'
};

describe('async gcloudStorage actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('signUpload', async () => {
    nock(config.apiBase)
      .post(`/storage/uploads`)
      .query(true)
      .reply(200, {
        status: 'success', data: mockSignedUpload
      });

    const params = { contentType: 'image/png' };

    const expectedActions = [
      { type: 'SIGN_UPLOAD_STARTED', payload: params },
      { type: 'SIGN_UPLOAD_DONE', payload: { params, result: mockSignedUpload } }
    ];

    const store = mockStore({ authentication: { accessToken: '' } });

    await store.dispatch(storageActions.signUpload(params.contentType));
    expect(store.getActions()).toEqual(expectedActions);

  });

});



