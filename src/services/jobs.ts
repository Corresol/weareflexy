import { OtherFailure, ValidationFailure } from '../types';
import { RemoteService } from './remoteService';

const config = require('../config');

export interface JobLocation {
  readonly id: string;
  readonly created: string;
  readonly version: number;
  readonly status:  'active' | 'deleted';
  readonly address: string;
  readonly postcode: string;  
  readonly lng: number;
  readonly lat: number;  
  readonly buildingFloor: string;
  readonly directions: string;
}

export interface Shift {
  readonly id: string;
  readonly created: string;
  readonly updated?: string;  
  
  readonly jobId: string;

  readonly creatorId: string;
  readonly updatorId: string;

  readonly locationId: string;

  readonly startTime: string;
  readonly endTime: string;
  readonly vacancies: number;

  readonly location?: JobLocation;

  readonly contactName?: string;
  readonly contactTel?: string;  

  readonly hourlyRate?: number;
  readonly bonusCommissionEnabled?: boolean;
  readonly bonusCommissionPolicy?: string;
  readonly expensesEnabled?: boolean;
  readonly expensesPolicy?: string;
  readonly unpaidBreakEnabled?: boolean;
  readonly unpaidBreakPolicy?: string;

  readonly scheduleId: string;
}

export interface JobCategory {
  readonly id: string;
  readonly created: string;
  readonly updated?: string;
  readonly version: number;
  readonly status: 'active' | 'deleted';
  readonly name: string;
  readonly description: string;
  readonly suggestedSkills: string[];
}

export interface JobEmployer {
  readonly id: string;
  readonly companyName: string;
  readonly logoUrl: string;
  readonly rating: number;
}

export interface Job {
  readonly id: string;
  readonly created: string;
  readonly updated?: string;
  readonly version: number;
  readonly status: 'active';

  readonly employer: JobEmployer;
  readonly employerAccountId: string;

  readonly title: string;
  readonly description: string;
  readonly categoryId: string;
  readonly experience: string;
  readonly skills: string[];
  readonly dressCode: string;
  readonly contactName: string;
  readonly contactTel: string;    

  // default location
  readonly locationId?: string;
  // all locations for the job
  readonly locations: Dictionary<JobLocation>;

  // pay
  readonly hourlyRate: number;

  readonly bonusCommissionEnabled: boolean;
  readonly bonusCommissionPolicy?: string;

  readonly expensesEnabled: boolean;
  readonly expensesPolicy?: string;

  readonly unpaidBreakEnabled: boolean;
  readonly unpaidBreakPolicy?: string;
  
  readonly interviewRequired: boolean;

  readonly shifts: Shift[];

  readonly fullTime: boolean;
  readonly weekdays: boolean;
  readonly weekends: boolean;
  readonly nightShifts: boolean;


}


export interface GetConflictingSchedulesOutput {
  conflictedScheduleIds: string[];
}

export interface BookSchedulesDTO {
  scheduleIds: string[];
  jobVersion: number;
}

interface ReplyNotInterestedJobAlertDTO {
  interested: false;
  reasonIds: null | string[];
}
interface ReplyInterestedJobAlertDTO {
  interested: true;   
}
export type ReplyJobAlertDTO = ReplyInterestedJobAlertDTO | ReplyNotInterestedJobAlertDTO;

export class JobsService extends RemoteService {

  baseUri = config.apiBase;

  async getJobCategories() {
    return this.callService<JobCategory[], OtherFailure>('GET', `/jobs/categories`)
  }

  async getJob(jobId: string) {
    return this.callService<Job, OtherFailure | ValidationFailure>('GET', `/jobs/${jobId}`)
  }

  async getConflictingSchedules(jobId: string, selectedScheduleIds: string[]) {
    return this.callService<GetConflictingSchedulesOutput, ValidationFailure | OtherFailure>(
      'GET', 
      `/jobs/${jobId}/conflicts?${selectedScheduleIds.join(',')}`
    );
  }

  async bookSchedules(jobId: string, dto: BookSchedulesDTO) {
    return this.callService<{}, ValidationFailure | OtherFailure>('POST', `/jobs/${jobId}/schedules`, dto);
  }

  async replyJobAlert(jobAlertId: string, dto: ReplyJobAlertDTO) {
    return this.callService<{}, ValidationFailure | OtherFailure>('PUT', `/jobs/alerts/${jobAlertId}`, dto);
  }

}
