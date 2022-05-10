import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  role?: UserRoles;

  departement?: string;
}

export enum UserRoles {
  SUPER_ADMIN = 'superadmin',
  MINISTRE = 'ministre',
  ADMIN = 'admin',
  MILITAIRE = 'militaire',
  USER = 'user',
  SPORT = 'sport',
}
