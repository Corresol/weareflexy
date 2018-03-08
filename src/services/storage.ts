const config = require('../config');

import { RemoteService } from './remoteService';
import { OtherFailure } from '../types';

export interface SignedUpload {
  uploadUrl: string;
  downloadUrl: string;  
  fileId: string;
}

export class StorageService extends RemoteService {
  baseUri = config.apiBase;

  signUpload(contentType: string) {
    return this.callService<SignedUpload, OtherFailure>('POST', `/storage/uploads?contentType=${contentType}`);
  } 

}
