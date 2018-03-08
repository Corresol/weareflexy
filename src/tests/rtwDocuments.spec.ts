import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import * as rtwDocumentsActions from '../actions/rtwDocuments';
import { rtwDocumentsReducer } from "../reducers/rtwDocuments";

const config = require('../config');

const mockStore = configureMockStore([thunk]);
const mockRtwDocumentDTO = {
  type: <'passport'>'passport',
  photos: [{
    type: 'front',
    fileId: 'flexy-worker-uploads/84dbaeaf-e484-49ef-840a-c848c6cbe317',
  }]
}


const mockRtwDocument = {
  ...mockRtwDocumentDTO,
  id: '84dbaeaf-e484-49ef-840a-c848c6cbe317',
  created: '2017-01-01T00:00:00Z',
  updated: '',
  status: 'pending' as 'pending',
  version: 0,
  photos: mockRtwDocumentDTO.photos.map((photo) => ({
    ...photo,
    downloadUrl: 'dummyurl'
  }))
};



describe('async rtwDocuments actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('getRtwDocuments', async () => {
    nock(config.apiBase)
      .get(`/rtw`)
      .reply(200, {
        status: 'success', data: [mockRtwDocument]
      });

    const params = {};

    const expectedActions = [
      { type: 'GET_RTW_DOCS_STARTED', payload: params },
      { type: 'GET_RTW_DOCS_DONE', payload: { params, result: [mockRtwDocument] } }
    ];

    const store = mockStore({ authentication: { accessToken: '' }, rtwDocuments: {} });

    await store.dispatch(rtwDocumentsActions.getRtwDocuments());
    expect(store.getActions()).toEqual(expectedActions);

  });

  it('createRtwDocument', async () => {

    nock(config.apiBase)
      .post('/rtw')
      .reply(200, {
        status: 'success', data: mockRtwDocument
      });

    const params = mockRtwDocumentDTO;

    const expectedActions = [
      { type: 'CREATE_RTW_DOC_STARTED', payload: params },
      { type: 'CREATE_RTW_DOC_DONE', payload: { params, result: mockRtwDocument } }
    ];
    const store = mockStore({ authentication: { accessToken: '' }, rtwDocuments: {} });

    await store.dispatch(rtwDocumentsActions.createRtwDocument(mockRtwDocumentDTO));
    expect(store.getActions()).toEqual(expectedActions);

  });

});


describe('rtwDocuments reducer', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  const initialState = {
    byId: {},
    latestId: null
  };

  it('should return initial state', async () => {
    expect(rtwDocumentsReducer(undefined, { type: 'TEST' })).toEqual(initialState);
  });

  it('should index rtwDocuments by id (getRtwDocuments)', async () => {
    expect(
      rtwDocumentsReducer(initialState, rtwDocumentsActions.getRtwDocumentsAsync.done({
        params: {} as any,
        result: [mockRtwDocument]
      }))
        .byId
    ).toEqual({
      [mockRtwDocument.id]: mockRtwDocument
    });
  });

  it('should index rtwDocuments by id (createRtwDocument)', async () => {
    expect(
      rtwDocumentsReducer(initialState, rtwDocumentsActions.createRtwDocumentAsync.done({
        params: {} as any,
        result: mockRtwDocument
      }))
        .byId
    ).toEqual({
      [mockRtwDocument.id]: mockRtwDocument
    });
  });


  it('should set latestId (createRtwDocument)', async () => {
    expect(
      rtwDocumentsReducer(initialState, rtwDocumentsActions.createRtwDocumentAsync.done({
        params: {} as any,
        result: mockRtwDocument
      }))
        .latestId
    ).toBe(mockRtwDocument.id);
  });

});




