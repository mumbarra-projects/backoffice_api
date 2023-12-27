import { ApiProperty } from '@nestjs/swagger';
import { companyStatus } from '@prisma/client';

export class CompanyResponse {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  businessName: string;

  @ApiProperty()
  document: string;

  @ApiProperty()
  address?: string;

  @ApiProperty()
  zipCode?: string;

  @ApiProperty()
  phone?: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  status: companyStatus;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt?: Date;
}