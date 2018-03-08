import { WorkerAccount } from './registration';
import { OtherFailure, JwtTokenPair } from '../types';
import { RemoteService } from './remoteService';
const config = require('../config');


export interface Authentication {
  readonly tokens: JwtTokenPair;
  readonly workerAccount: WorkerAccount;
}

export interface Logout {
  authenticationId: string;
  revoked: boolean;
}

export class AuthenticationService extends RemoteService {

  baseUri = config.apiBase;

  getCurrentAuthentication() {
    return this
      .withConfig({ validateStatus: (status) => status >= 200 && status < 300 || status === 404 })
      .callService<Authentication, { code: number }>('GET', '/authentications/current');
  }

  authenticate(email: string, password: string) {
    return this
      .withConfig({ validateStatus: (status) => status >= 200 && status < 300 || status === 401 })
      .callService<Authentication, { message: string, lockedUntil?: string }>('POST', '/authentications/password', {
      email, password
    });
  }

  logout() {
    return this.callService<Logout, OtherFailure>('DELETE', '/authentications/current');
  }


  refreshAccessToken(authenticationId: string, refreshToken: string) {
    return this.callService<JwtTokenPair, never>(
      'POST',
      `/authentications/${authenticationId}/refreshes`,
      { refreshToken }
    );
  }

}