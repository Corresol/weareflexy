import * as qs from 'querystring';
import { RemoteService } from './remoteService';
import { ValidationFailure, OtherFailure } from '../types';
const config = require('../config');

export interface OperatorAccount {
  firstName: string;
  lastName: string;
  photo: string;
}


export interface Appointment {

  readonly id: string;

  readonly created: string;
  readonly updated?: string;

  readonly status: 'pending' | 'booked' | 'cancelled';

  readonly startTime: string;
  readonly endTime: string;

  readonly operatorId: string;
  readonly operator: OperatorAccount;

  readonly bookedOn?: string;
  readonly platform?: string;
  readonly platformIdentity?: string;
  readonly workerId?: string;

  readonly leadTimePassed: boolean;
}

export interface BookAppointmentDTO {
  platform: 'whatsapp' | 'skype' | 'facetime';
  platformIdentity: string;
  version: number;
}



export class AppointmentsService extends RemoteService {

  baseUri = config.apiBase;

  async getAppointment(appointmentId: string) {
    return this.callService<Appointment, ValidationFailure | OtherFailure>('GET', `/appointments/${appointmentId}`);
  }

  async getBookedAppointment() {
    return this.callService<Appointment | null, ValidationFailure | OtherFailure>('GET', `/appointments/booked`);
  }

  async getAppointments(from: string, to: string) {
    return this.callService<Appointment[], ValidationFailure | OtherFailure>('GET', `/appointments?${qs.stringify({ from, to })}`)
  }

  async bookAppointment(appointmentId: string, dto: BookAppointmentDTO) {
    return this.callService<Appointment, ValidationFailure | OtherFailure>('PATCH', `/appointments/${appointmentId}`, dto);
  }

}