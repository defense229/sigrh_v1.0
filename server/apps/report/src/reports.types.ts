import { ApiProperty } from '@nestjs/swagger';

export enum PDFFormat {
  A0 = 'A0',
  A1 = 'A1',
  A2 = 'A2',
  A3 = 'A3',
  A4 = 'A4',
  A5 = 'A5',
  A6 = 'A6',
  Letter = 'Letter',
}

export class IPdfDownloadPayload {
  @ApiProperty()
  html: string;

  @ApiProperty({ required: false, default: false })
  landscape?: boolean;

  @ApiProperty({ required: false, enum: PDFFormat })
  format?: PDFFormat;

  @ApiProperty({ required: false })
  margin?: any;
}

export class IXlsxDownloadPayload {
  @ApiProperty()
  data: Record<string, string>[];
}
