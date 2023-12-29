import { ApiProperty } from '@nestjs/swagger';
import { companyServiceStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CompanyServiceRequest {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(1, 3)
  key?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(1, 3)
  apikey?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 45)
  companyId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 45)
  serviceId: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(companyServiceStatus)
  status?: companyServiceStatus;
}