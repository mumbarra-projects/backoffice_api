import { ApiProperty } from '@nestjs/swagger';
import { companyStatus } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CompanyRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  businessName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 14)
  document: string;

  @ApiProperty()
  @IsOptional()
  address?: string;

  @ApiProperty()
  @IsOptional()
  zipCode?: string;

  @ApiProperty()
  @IsOptional()
  phone?: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(1, 255)
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(companyStatus)
  status?: companyStatus;
}