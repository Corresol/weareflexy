import actionCreatorFactory from 'redux-typescript-actions';

import { BookAppointmentDTO, Appointment, AppointmentsService } from '../services/appointments';
import { AppState } from '../reducers/index';

const actionCreator = actionCreatorFactory();

export const getAppointmentAsync = actionCreator.async<{ appointmentId: string }, Appointment>('GET_APPT');
export function getAppointnment(appointmentId: string) {
  return async (dispatch, getState: () => AppState) => {
    const state = getState();
    const apptSvc = new AppointmentsService().useAccessToken(state.authentication.accessToken);

    dispatch(getAppointmentAsync.started({ appointmentId }));

    try {
      var result = await apptSvc.getAppointment(appointmentId);
    } catch (error) {
      return dispatch(getAppointmentAsync.failed({ params: { appointmentId }, error }));
    }

    if (result.status === 'success') return dispatch(getAppointmentAsync.done({ params: { appointmentId }, result: result.data }));
    else return dispatch(getAppointmentAsync.failed({ params: { appointmentId }, error: result.data }));

  };
}


export const getAppointmentsAsync = actionCreator.async<{ from: string, to: string }, Appointment[]>('GET_APPTS');
export function getAppointments(from: string, to: string) {
  return async (dispatch, getState: () => AppState) => {
    const state = getState();
    const apptSvc = new AppointmentsService().useAccessToken(state.authentication.accessToken);

    dispatch(getAppointmentsAsync.started({ from, to }));

    try {
      var result = await apptSvc.getAppointments(from, to);
    } catch (error) {
      return dispatch(getAppointmentsAsync.failed({ params: { from, to }, error }));
    }

    if (result.status === 'success') return dispatch(getAppointmentsAsync.done({ params: { from, to }, result: result.data }));
    else return dispatch(getAppointmentsAsync.failed({ params: { from, to }, error: result.data }));

  }
}

export const getBookedAppointmentAsync = actionCreator.async<{}, Appointment | null>('GET_BOOKED_APPT');
export function getBookedAppointment() {
  return async (dispatch, getState: () => AppState) => {
    const state = getState();
    const apptSvc = new AppointmentsService().useAccessToken(state.authentication.accessToken);

    dispatch(getBookedAppointmentAsync.started({}));

    try {
      var result = await apptSvc.getBookedAppointment();
    } catch (error) {
      return dispatch(getBookedAppointmentAsync.failed({ params: {}, error }));
    }

    if (result.status === 'success') return dispatch(getBookedAppointmentAsync.done({ params: {}, result: result.data }));
    else return dispatch(getBookedAppointmentAsync.failed({ params: {}, error: result.data }));

  }
}

export const bookAppointmentAsync = actionCreator.async<{ appointmentId: string, dto: BookAppointmentDTO }, Appointment>('BOOK_APPT');
export function bookAppointment(appointmentId: string, dto: BookAppointmentDTO) {
    return async (dispatch, getState: () => AppState) => {
      const state = getState();
      const apptSvc = new AppointmentsService().useAccessToken(state.authentication.accessToken);
      const params = { appointmentId, dto };
      dispatch(bookAppointmentAsync.started(params));

      try {
        var result = await apptSvc.bookAppointment(appointmentId, dto);
      } catch (error) {
        return dispatch(bookAppointmentAsync.failed({ params, error }));
      }

      if (result.status === 'success') return dispatch(bookAppointmentAsync.done({ params, result: result.data }));
      else return dispatch(bookAppointmentAsync.failed({ params, error: result.data }));

    }
}

