import { ApiProperty } from '@nestjs/swagger';
import { serviceLevel, servicePlan, serviceStatus } from '@prisma/client';

export class ServiceResponse {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  level: serviceLevel;

  @ApiProperty()
  plan?: servicePlan;

  @ApiProperty()
  status: serviceStatus;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt?: Date;
}