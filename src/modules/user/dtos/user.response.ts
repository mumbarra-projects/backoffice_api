import { ApiProperty } from '@nestjs/swagger';
import { userAccessLevel, userStatus } from '@prisma/client';

export class UserResponse {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  document: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  status: userStatus;

  @ApiProperty()
  accessLevel: userAccessLevel;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt?: Date;
}