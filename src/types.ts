import { ValidationError } from 'class-validator';

export enum FailureCode {
    NOT_FOUND = 3000,                  // resource was not found
    RELATION_NOT_FOUND,                // a relation of the resource was not found
    AUTHENTICATION_FAILED,
    CONFLICT,
    VALIDATION_FAILED,
    UNAUTHORIZED
}

export type ValidationFailure =
  { code: FailureCode.VALIDATION_FAILED, validationErrs: ValidationError[] };

export type OtherFailure =
  { code: FailureCode.UNAUTHORIZED | FailureCode.CONFLICT | FailureCode.NOT_FOUND };


export interface JwtTokenPair {
  readonly email: string;
  readonly authenticationId: string;
  readonly accessToken: string;
  readonly claims: { readonly [key: string]: any },
  readonly accessTokenExpires: string;
  readonly refreshToken: string;
  readonly refreshTokenExpires: string;
}


declare global {
  export interface Dictionary<T> {
    [key: string]: T;
  }
}
