export interface IPdfDownloadPayload {
  html: string;
  landscape?: boolean;
  format?: 'A0' | 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'A6' | 'Letter';
}

export interface IXlsxDownloadPayload {
  data: Record<string, string>[];
}
