import { FailureCode } from '../types';

export interface JSendSuccess<T> {
  status: 'success';
  data: T;
}

export interface JSendFailureData {
  code?: FailureCode;  
  message?: string;
}

export interface JSendFailure<T extends JSendFailureData> {
  status: 'fail';
  data: { message: string } & T;
}

interface JSendError {
  status: 'error';
  code?: number;
  message: string;
}

export type JSendResponse<TS, TF extends JSendFailureData> = JSendSuccess<TS> | JSendFailure<TF> | JSendError;

type ValidJSendResponse = {
  status: 'error' | 'fail' | 'success';
};

export function isJSendResponse(body: any): body is ValidJSendResponse {
  return body.status && (body.status === 'error' || body.status === 'fail' || body.status === 'success');
}
