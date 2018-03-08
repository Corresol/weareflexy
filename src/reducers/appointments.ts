import { Action as ReduxAction, combineReducers } from 'redux';
import { isType } from 'redux-typescript-actions';
import moment from 'moment';
import { groupBy, keyBy, mapValues } from 'lodash';

import * as appointmentActions from '../actions/appointments';
import { Appointment } from '../services/appointments';


const keyApptByDay = (a: Appointment) => moment(a.startTime).startOf('day').toISOString();

function byId(state: Dictionary<Appointment> = {}, action: ReduxAction) {

  // singles
  if (
    isType(action, appointmentActions.getAppointmentAsync.done) ||
    isType(action, appointmentActions.bookAppointmentAsync.done) ||
    isType(action, appointmentActions.getBookedAppointmentAsync.done)
  ) {
    if (action.payload.result === null) return { ...state };
    state = {
      ...state,
      [action.payload.result.id]: action.payload.result
    };
  }

  // arrays
  if (
    isType(action, appointmentActions.getAppointmentsAsync.done)
  ) {
    state = {
      ...state,
      ...keyBy(action.payload.result, (a) => a.id)
    }
  }

  return state;
}

function byDay(state: Dictionary<string[]> = {}, action: ReduxAction) {

  // singles
  if (
    isType(action, appointmentActions.bookAppointmentAsync.done) ||
    isType(action, appointmentActions.getAppointmentAsync.done) ||
    isType(action, appointmentActions.getBookedAppointmentAsync.done)
  ) {
    state = { ...state };
    if (action.payload.result === null) return state;

    const dayKey = keyApptByDay(action.payload.result);
    const dayIdx = state[dayKey] || [];
    if (dayIdx.indexOf(action.payload.result.id) === -1) dayIdx.push(action.payload.result.id);
    state[dayKey] = dayIdx;
  }

  // arrays
  if (
    isType(action, appointmentActions.getAppointmentsAsync.done)
  ) {
    state = {
      ...state,
      ...mapValues(groupBy(action.payload.result, keyApptByDay), (v) => v.map((v) => v.id))
    };
  }

  return state;
}

function bookedAppointmentId(state: string | null = null, action: ReduxAction) {
  // appt was booked, or booked appt was loaded
  if (
    isType(action, appointmentActions.bookAppointmentAsync.done) ||
    isType(action, appointmentActions.getBookedAppointmentAsync.done)
  ) {
    if (action.payload.result === null) return state;
    state = action.payload.result.id;
  }
  return state;
}


export interface AppointmentsState {
  byId: Dictionary<Appointment>;
  byDay: Dictionary<string[]>;
  bookedAppointmentId: string | null;
}

export const appointmentsReducer = combineReducers<AppointmentsState>({
  byId,
  byDay,
  bookedAppointmentId
});

