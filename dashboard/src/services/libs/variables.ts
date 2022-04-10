import { IUser } from '../types/login.types';

export const _defaultUser: IUser = {
  username: '',
  password: '',
};

export const _getDefaultQueryParams = (value: string) => ({
  limit: 8,
  skip: 0,
  search: value,
});

export const STATUS_MATCHING: any = {
  NEW: 'Nouveau',
  PENDING: 'En cours',
  CLOSED: 'Terminé',
  ACCEPTED: 'Accepté',
  REJECTED: 'Rejeté',
};

export enum ExamSteps {
  candidateFileCollectStep = 'candidateFileCollectStep',
  sportStep = 'sportStep',
  fileAuthenticationStep = 'fileAuthenticationStep',
  writingStep = 'writingStep',
  healthControlStep = 'healthControlStep',
}

export const STEPS_SELECT = [
  { id: 'candidateFileCollectStep', name: 'Phase de dépôt de dossier' },
  { id: 'sportStep', name: 'Phase sportive' },
  // { id: 'fileAuthenticationStep', name: 'Authentification de diplôme' },
  // { id: 'writingStep', name: 'Phase écrite' },
  // { id: 'healthControlStep', name: 'Visite médicale' },
];
