import axios, { AxiosRequestConfig } from 'axios';

const config = require('../config');

import { BadResponseError } from '../lib/errors';
import { JSendFailure, JSendFailureData, JSendSuccess, isJSendResponse, JSendResponse } from '../lib/jsendResponse';
import { debuglog } from 'util';
const logGateway = debuglog('gateway');

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export abstract class RemoteService {

  protected abstract baseUri: string;

  protected axiosCfg = { ...config.axiosDefaults };
  public withConfig(cfg: AxiosRequestConfig): this {
    this.axiosCfg = { ...this.axiosCfg, ...cfg };
    return this;
  }

  private accessToken: string;
  public useAccessToken(accessToken: string) {
    this.accessToken = accessToken;
    return this;
  };

  protected async callService<S, F extends JSendFailureData>(method: 'GET', path: string, qs?: {}): Promise<JSendSuccess<S> | JSendFailure<F>>;
  protected async callService<S, F extends JSendFailureData>(method: 'POST' | 'PUT' | 'PATCH' | 'DELETE', path: string, body?: {}, qs?: {}): Promise<JSendSuccess<S> | JSendFailure<F>>;
  protected async callService<S, F extends JSendFailureData>(method: HttpMethod, path: string, bodyOrQs?: {}, qs?: {}): Promise<JSendSuccess<S> | JSendFailure<F>> {

    let body;
    if (method === 'GET' && bodyOrQs && !qs) {
      qs = bodyOrQs;
    } else {
      body = bodyOrQs;
    }

    let fullUri = this.baseUri.concat(path);

    return axios({
      url: fullUri,
      method,
      params: qs,
      data: body,
      headers: this.accessToken ? {
        'Authorization': `Bearer ${this.accessToken}`
      } : {},
      ...this.axiosCfg
    }).then((response) => {

      let result: JSendResponse<S, F> | {} = response.data;
      if (!isJSendResponse(result)) {
        const err = new BadResponseError(`${fullUri} malformed response`, result);
        logGateway('Error', err);
        throw err;
      }

      if (result.status === 'error') {
        const err = new BadResponseError(`${fullUri} error response`, result);
        logGateway('Error', err);
        throw err;
      }

      logGateway('Response', result);

      return result;

    });

  }
}


