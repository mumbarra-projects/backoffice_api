import { CompanyResponse } from '@app/modules/company/dtos/company.response';
import { ServiceResponse } from '@app/modules/service/dtos/service.response';
import { ApiProperty } from '@nestjs/swagger';
import { companyServiceStatus } from '@prisma/client';

export class CompanyServiceResponse {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  apikey: string;

  @ApiProperty()
  company: CompanyResponse;

  @ApiProperty()
  service: ServiceResponse;

  @ApiProperty()
  status: companyServiceStatus;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt?: Date;
}