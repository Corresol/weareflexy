import { combineReducers } from 'redux';

import { AuthenticationState, authenticationReducer } from './authentication';
import { WorkerAccountState, workerAccountReducer } from './workerAccount';
import { AppointmentsState, appointmentsReducer } from './appointments';
import { PhoneState, phoneReducer } from './phone';
import { JobsState, jobsReducer } from './jobs';

import {
  app,
  appCache
} from './application'

import { RtwDocumentsState, rtwDocumentsReducer } from "./rtwDocuments";
import { JobCategoriesState, jobCategoriesReducer } from "./jobCategories";

export interface AppState {
  authentication: AuthenticationState,
  workerAccount: WorkerAccountState,
  jobs: JobsState,
  jobCategories: JobCategoriesState,
  phone: PhoneState,
  appointments: AppointmentsState,
  rtwDocuments: RtwDocumentsState,
  app: any,
  appCache: any
}

export const rootReducer = combineReducers<AppState>({
  authentication: authenticationReducer,
  workerAccount: workerAccountReducer,
  jobs: jobsReducer,
  jobCategories: jobCategoriesReducer,
  app: app,
  appCache: appCache,
  phone: phoneReducer,
  appointments: appointmentsReducer,
  rtwDocuments: rtwDocumentsReducer
});