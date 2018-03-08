const config = require('../config');
import { ValidationFailure, OtherFailure } from '../types';
import { RemoteService } from './remoteService';
import { Authentication } from "./authentication";

export interface CreateAccountDTO {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  phoneVerificationToken: string;
}

export interface EditAccountDTO {
  firstName?: string;
  lastName?: string;
  email?: string;
  photo?: string;
  version?: number;
}

export interface ConfirmPhoneDTO {
  phone: string;
  confirmCode: string;
  version?: number;
}

export interface Phone {
  readonly id: string;
  readonly version: number;
  readonly created: string;

  readonly updated?: string;

  readonly status: 'pending' | 'verified';

  readonly phone: string;
  readonly verificationToken?: string;
}


export interface WorkerAccount {
  readonly id: string;
  readonly created: string;
  readonly updated?: string;
  readonly version: number;

  // record status
  readonly status: 'active' | 'pending';

  readonly firstName: string;
  readonly lastName: string;

  readonly email: string;

  readonly creationStatus: 'creating' | 'created';

  readonly phone?: string;
  readonly pendingPhone: string | null;
  readonly confirmCode: string | null;

  readonly photo?: string;
  readonly pendingPhoto?: string;

  readonly personalStatement?: string;

}



export class RegistrationService extends RemoteService {
  baseUri = config.apiBase;

  async createUnverifiedPhone(phone: string) {
    return this.callService<Phone, ValidationFailure | OtherFailure>('POST', `/phones`, { phone });
  }

  async confirmPhone(dto: ConfirmPhoneDTO) {
    return this.callService<Phone, ValidationFailure | OtherFailure>('POST', `/phones/confirmed`, dto);
  }

  async createAccount(dto: CreateAccountDTO) {
    return this.callService<Authentication, ValidationFailure | OtherFailure>('POST', '/registration', dto);
  }

  async editAccount(dto: EditAccountDTO) {
    return this.callService<WorkerAccount, ValidationFailure | OtherFailure>('PATCH', `/registration`, dto);
  }



}

