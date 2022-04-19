export type TLanguage = 'fr' | 'en';

export interface Ii18n {
  language: TLanguage;
  dictionnary: Record<string, string>;
}
