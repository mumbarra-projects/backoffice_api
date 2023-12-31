import { ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Post, Put } from '@nestjs/common';
import { CompanyResponse } from './dtos/company.response';
import { CompanyRequest } from './dtos/company.request';
import { ICompanyService } from './company.service.interface';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(
    @Inject('COMPANY_SERVICE')
    private readonly service: ICompanyService,
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

  @Put(':uuid')
  @ApiBody({ type: CompanyRequest, description: 'Company request' })
  @ApiOkResponse({ type: CompanyResponse })
  @HttpCode(200)
  async update(
    @Param('uuid') uuid: string,
    @Body() request: CompanyRequest
  ): Promise<CompanyResponse> {
    return this.service.update(request, uuid);
  }

  @Delete(':uuid')
  @ApiNoContentResponse()
  @HttpCode(204)
  async delete(
    @Param('uuid') uuid: string,
  ): Promise<void> {
    await this.service.delete(uuid);
  }
}