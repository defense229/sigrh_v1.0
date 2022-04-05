import { ApiProperty } from '@nestjs/swagger';

export interface IFieldPayload {
  label?: string;
  coefficient?: number;
  exam?: string;
}

export class FieldPayload implements IFieldPayload {
  @ApiProperty({ required: true })
  label: string;

  @ApiProperty({ required: true })
  coefficient: number;

  @ApiProperty({ required: true })
  exam: string;
}
