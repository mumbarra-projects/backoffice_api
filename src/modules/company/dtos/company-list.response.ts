import { ApiProperty } from '@nestjs/swagger';
import { companyStatus } from '@prisma/client';
import { CompanyResponse } from './company.response';

export class CompanyListResponse {
  @ApiProperty()
  count: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty({ type: CompanyResponse, isArray: true })
  data: CompanyResponse[];
}