import { companyStatus } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CompanyRequest {
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  businessName: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 14)
  document: string;

  @IsOptional()
  address?: string;

  @IsOptional()
  zipCode?: string;

  @IsOptional()
  phone?: string;

  @IsNotEmpty()
  @Length(1, 255)
  @IsEmail()
  email: string;

  @IsEnum(companyStatus)
  status?: companyStatus;
}