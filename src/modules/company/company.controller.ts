import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { CompanyResponse } from './dtos/company.response';
import { CompanyRequest } from './dtos/company.request';

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

  @Get(':uuid')
  @ApiOkResponse({ type: CompanyResponse })
  @HttpCode(200)
  async findById(
    @Param('uuid') uuid: string
  ): Promise<CompanyResponse> {
    return this.service.findById(uuid);
  }

  @Post()
  @ApiBody({ type: CompanyRequest, description: 'Company request' })
  @ApiCreatedResponse({ type: CompanyResponse })
  @HttpCode(201)
  async create(
    @Body() request: CompanyRequest
  ): Promise<CompanyResponse> {
    return this.service.create(request);
  }
}