import { config } from 'dotenv';
export function getEnv(name: string) {
  config();
  return process.env[name] ?? '';
}

export interface DF_DATA_PAGINATION {
  page?: number;
  limit?: number;
}

export const DF_TYPE_CANDIDAT = {
  normal: 'NORMAL',
  enseignant: 'ENSEIGNANT',
  aideSoignant: 'AIDE_SOIGNANT',
};

export type DF_CANDIDAT_CATEGORIE = 'NORMAL' | 'ENSEIGNANT' | 'AIDE_SOIGNANT';

export const DF_DEPARTEMENTS = [
  'Atacora',
  'Donga',
  'Alibori',
  'Borgou',
  'Collines',
  'Zou',
  'Atlantique',
  'Littoral',
  'Couffo',
  'Mono',
  'Oueme',
  'Plateau',
];

export const getDepartementPrefix = DF_DEPARTEMENTS.map((it) =>
  it.toUpperCase().substring(0, 3),
);

export const getDepartementCode = (department: string) =>
  10 + DF_DEPARTEMENTS.findIndex((it) => it === department);

export enum WsEvents {
  REPARTITION_END = 'REPARTITION_END',
  REPARTITION_PROGRESS = 'REPARTITION_PROGRESS',
  REPARTITION_ERROR = 'REPARTITION_ERROR',
  ADD_SCORE = 'ADD_SCORE',
  CANDIDATE_SELECTED = 'CANDIDATE_SELECTED',
}
