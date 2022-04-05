import { ApiProperty } from '@nestjs/swagger';

export interface IEmailPayload {
  subject: string;
  receivers: string[];
  content: string | Buffer;
  contentData?: any;
}

export class EmailPayload implements IEmailPayload {
  @ApiProperty()
  subject: string;

  @ApiProperty()
  receivers: string[];

  @ApiProperty()
  content: string | Buffer;

  @ApiProperty({ required: false })
  contentData?: any;
}
