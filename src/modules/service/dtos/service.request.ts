import { ApiProperty } from '@nestjs/swagger';
import { serviceLevel, servicePlan, serviceStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class ServiceRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(1, 255)
  description?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(serviceLevel)
  level: serviceLevel;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(servicePlan)
  plan: servicePlan;

  @ApiProperty()
  @IsOptional()
  @IsEnum(serviceStatus)
  status?: serviceStatus;
}