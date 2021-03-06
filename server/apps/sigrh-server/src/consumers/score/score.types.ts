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

export interface IScorePayload {
  exam: string;
  field: string;
  candidate: string;
  value: number;
}

export class ScorePayload implements IFieldPayload {
  @ApiProperty()
  exam: string;

  @ApiProperty()
  field: string;

  @ApiProperty()
  candidate: string;

  @ApiProperty({ type: Number })
  value: number;
}
