import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import moment from 'moment';

import * as appointmentActions from '../actions/appointments';
import { BookAppointmentDTO } from "../services/appointments";
import { appointmentsReducer } from "../reducers/appointments";
import { getBookedAppointmentAsync } from "../actions/appointments";

const config = require('../config');

const mockStore = configureMockStore([thunk]);

const mockApptPending = {
  id: '84dbaeaf-e484-49ef-840a-c848c6cbe317',
  created: '2017-01-01T00:00:00Z',
  updated: '',
  status: 'pending' as 'pending',
  startTime: '2017-01-01T00:00:00Z',
  endTime: '2017-01-01T00:15:00Z',
  operatorId: 'b9155855-af9f-4f8b-8030-0cbbc210d5ab',
  operator: {
    firstName: 'Drew',
    lastName: 'Rathbone',
    photo: ''
  },
  version: 0,
  leadTimePassed: true
};

const mockApptBooked = {
  id: 'b9155855-af9f-4f8b-8030-0cbbc210d5ab',
  created: '2017-01-01T00:00:00Z',
  updated: '2017-01-01T00:00:00Z',
  status: 'booked' as 'booked',
  startTime: '2017-01-01T00:00:00Z',
  endTime: '2017-01-01T00:15:00Z',
  operatorId: 'b9155855-af9f-4f8b-8030-0cbbc210d5ab',
  operator: {
    firstName: 'Drew',
    lastName: 'Rathbone',
    photo: ''
  },
  workerId: 'b9155855-af9f-4f8b-8030-0cbbc210d5ab',
  platform: 'skype',
  platformIdentity: 'drew.rathbone16',
  version: 1,
  leadTimePassed: true
};


describe('async appointment actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('getAppointment', async () => {
    nock(config.apiBase)
      .get(`/appointments/${mockApptPending.id}`)
      .reply(200, {
        status: 'success', data: mockApptPending
      });

    const params = { appointmentId: mockApptPending.id };

    const expectedActions = [
      { type: 'GET_APPT_STARTED', payload: params },
      { type: 'GET_APPT_DONE', payload: { params, result: mockApptPending } }
    ];

    const store = mockStore({ authentication: { accessToken: '' }, appoointments: {} });

    await store.dispatch(appointmentActions.getAppointnment(params.appointmentId));
    expect(store.getActions()).toEqual(expectedActions);

  });

  it('getAppointments', async () => {

    nock(config.apiBase)
      .get('/appointments')
      .query(true)
      .reply(200, {
        status: 'success', data: [mockApptPending]
      });

    const params = { from: '2017-01-01T00:00:00.000', to: '2017-12-31T00:00:00.000' };

    const expectedActions = [
      { type: 'GET_APPTS_STARTED', payload: params },
      { type: 'GET_APPTS_DONE', payload: { params, result: [mockApptPending] } }
    ];
    const store = mockStore({ authentication: { accessToken: '' }, appointments: {} });

    await store.dispatch(appointmentActions.getAppointments(params.from, params.to));
    expect(store.getActions()).toEqual(expectedActions);

  });


  it('bookAppointment', async () => {

    nock(config.apiBase)
      .patch(`/appointments/${mockApptPending.id}`)
      .reply(200, {
        status: 'success', data: mockApptBooked
      });

    const params: { appointmentId: string, dto: BookAppointmentDTO } = {
      appointmentId: mockApptPending.id,
      dto: {
        platform: 'skype',
        platformIdentity: 'drew.rathbone16',
        version: 0
      }
    };

    const expectedActions = [
      { type: 'BOOK_APPT_STARTED', payload: params },
      { type: 'BOOK_APPT_DONE', payload: { params, result: mockApptBooked } }
    ];
    const store = mockStore({ authentication: { accessToken: '' }, appointments: {} });

    await store.dispatch(appointmentActions.bookAppointment(params.appointmentId, params.dto));
    expect(store.getActions()).toEqual(expectedActions);

  });

  it('getBookedAppointment', async () => {
    nock(config.apiBase)
      .get('/appointments/booked')
      .reply(200, {
        status: 'success', data: mockApptBooked
      });

      const params = {};

      const expectedActions = [
        getBookedAppointmentAsync.started(params),
        getBookedAppointmentAsync.done({ params, result: mockApptBooked })
      ];
      const store = mockStore({ authentication: { accessToken: '' }, appointments: {} });

      await store.dispatch(appointmentActions.getBookedAppointment());
      expect(store.getActions()).toEqual(expectedActions);

  });

});



describe('appointments reducer', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  const initialState = {
    byId: {},
    byDay: {},
    bookedAppointmentId: null
  };

  it('should return initial state', async () => {
    expect(appointmentsReducer(undefined, { type: 'TEST' })).toEqual(initialState);
  });

  it('should index appts by id (getAppointment)', async () => {
    expect(
      appointmentsReducer(initialState, appointmentActions.getAppointmentAsync.done({
        params: {} as any,
        result: mockApptPending
      }))
        .byId
    ).toEqual({
      [mockApptPending.id]: mockApptPending
    });
  });

  it('should index appts by id (getAppointments)', async () => {
    expect(
      appointmentsReducer(initialState, appointmentActions.getAppointmentsAsync.done({
        params: {} as any,
        result: [mockApptPending]
      }))
        .byId
    ).toEqual({
      [mockApptPending.id]: mockApptPending
    });
  });

  it('should index appts by id (bookAppointment)', async () => {
    expect(
      appointmentsReducer(initialState, appointmentActions.bookAppointmentAsync.done({
        params: {} as any,
        result: mockApptBooked
      }))
        .byId
    ).toEqual({
      [mockApptBooked.id]: mockApptBooked
    });
  });


  it('should index appts by id (getBookedAppointment)', async () => {
    expect(
      appointmentsReducer(initialState, appointmentActions.getBookedAppointmentAsync.done({
        params: {} as any,
        result: mockApptBooked
      }))
        .byId
    ).toEqual({
      [mockApptBooked.id]: mockApptBooked
    });
  });

  it('should index appts by day (getAppointment)', async () => {
    expect(
      appointmentsReducer(initialState, appointmentActions.getAppointmentAsync.done({
        params: {} as any,
        result: mockApptPending
      }))
        .byDay
    ).toEqual({
      [moment(mockApptPending.startTime).startOf('day').toISOString()]: [mockApptPending.id]
    });
  });
  

  it('should index appts by day (getAppointments)', async () => {
    expect(
      appointmentsReducer(initialState, appointmentActions.getAppointmentsAsync.done({
        params: {} as any,
        result: [mockApptPending]
      }))
        .byDay
    ).toEqual({
      [moment(mockApptPending.startTime).startOf('day').toISOString()]: [mockApptPending.id]
    });
  });

  it('should set bookedAppointmentId (bookAppointment)', async () => {
    expect(
      appointmentsReducer(initialState, appointmentActions.bookAppointmentAsync.done({
        params: {} as any,
        result: mockApptBooked
      }))
        .bookedAppointmentId
    ).toBe(mockApptBooked.id);
  });

  it('should set bookedAppointmentId (getBookedAppointment)', async () => {
    expect(
      appointmentsReducer(initialState, appointmentActions.getBookedAppointmentAsync.done({
        params: {} as any,
        result: mockApptBooked
      }))
        .bookedAppointmentId
    ).toBe(mockApptBooked.id);
  });

});


