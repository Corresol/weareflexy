const config = require('../config');
import { ValidationFailure, OtherFailure } from '../types';
import { RemoteService } from './remoteService';

export class CredentialsService extends RemoteService {
  baseUri = `${config.apiBase}/credentials`;  

  async getEmailAvailability(email: string) {
    return this.callService<{ email: string, available: boolean }, ValidationFailure | OtherFailure>('GET', `/availability/${email}`);
  }

}

