import * as seedLib from './seed';

export const seed = seedLib;

export const DF_TYPE_CANDIDAT = {
  normal: 'NORMAL',
  enseignant: 'ENSEIGNANT',
  aideSoignant: 'AIDE_SOIGNANT'
};

export type DF_CANDIDAT_CATEGORIE = 'NORMAL' | 'ENSEIGNANT' | 'AIDE_SOIGNANT';

export const DF_DEPARTEMENTS = [
  "Atacora", "Donga", "Alibori", "Borgou", "Collines",
  "Zou", "Atlantique", "Littoral", "Couffo", "Mono", "Oueme", "Plateau"
];

export const getDepartementPrefix = DF_DEPARTEMENTS.map(it => it.toUpperCase().substring(0, 3));
