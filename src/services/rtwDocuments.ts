import { RemoteService } from './remoteService';
import { ValidationFailure, OtherFailure } from '../types';
const config = require('../config');

export class DocumentPhotoDTO {
  type: string;
  fileId: string;
}

export interface DocumentPhoto extends Readonly<DocumentPhotoDTO> {
  readonly downloadUrl: string;
}

export type RtwDocumentType = 'passport' | 'visa' | 'residence-card';

export interface RtwDocumentDTO {
  type: RtwDocumentType;
  photos: DocumentPhotoDTO[];
}

export interface RtwDocument extends Readonly<RtwDocumentDTO> {
  readonly id: string;
  readonly created: string;
  readonly updated?: string;
  readonly version: number;

  readonly status: 'active' | 'pending' | 'rejected';
  photos: DocumentPhoto[];
}



export class RtwDocumentsService extends RemoteService {

  baseUri = config.apiBase;

  async getRtwDocuments() {
    return this.callService<RtwDocument[], ValidationFailure | OtherFailure>('GET', `/rtw`);
  }

  async createRtwDocument(dto: RtwDocumentDTO) {
    return this.callService<RtwDocument, ValidationFailure | OtherFailure>('POST', `/rtw`, dto);
  }


}