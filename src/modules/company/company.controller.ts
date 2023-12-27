import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { Controller, Get, HttpCode } from '@nestjs/common';
import { CompanyResponse } from './dtos/company.response';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(
    private readonly service: CompanyService,
  ) { }

  @Get()
  @ApiOkResponse({ isArray: true, type: CompanyResponse })
  @HttpCode(200)
  async findAll(): Promise<CompanyResponse[]> {
    return this.service.findAll();
  }
}