import { WorkerAccount } from './registration';
import { OtherFailure, ValidationFailure } from '../types';
import { RemoteService } from './remoteService';
const config = require('../config');


export class AccountService extends RemoteService {

  baseUri = config.apiBase;

  getWorkerAccount() {
    return this.callService<WorkerAccount, ValidationFailure | OtherFailure>('GET', '/account');
  }

}