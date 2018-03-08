import { RemoteService } from './remoteService';
import { ValidationFailure, OtherFailure } from '../types';
import { WorkerAccount } from './registration';
const config = require('../config');

export class ProfileService extends RemoteService {

  baseUri = config.apiBase;

  async setPersonalStatement(dto: { personalStatement: string }) {
    return this.callService<WorkerAccount, ValidationFailure | OtherFailure>('PUT', `/profile/statement`, dto);
  }

}