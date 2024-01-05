import { ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Post, Put, Query, UseFilters } from '@nestjs/common';
import { CompanyResponse } from './dtos/company.response';
import { CompanyRequest } from './dtos/company.request';
import { ICompanyService } from './company.service.interface';
import { Public } from '../auth/decorators/public.decorator';
import { HttpExceptionFilter } from '@app/config/exception/http.exception.filter';
import { CompanyListResponse } from './dtos/company-list.response';

@ApiTags('Company')
@UseFilters(new HttpExceptionFilter())
@Controller('company')
export class CompanyController {
  constructor(
    @Inject('COMPANY_INTERFACE')
    private readonly service: ICompanyService,
  ) { }

  @Public()
  @Get()
  @ApiOkResponse({ isArray: true, type: CompanyListResponse })
  @HttpCode(200)
  async findAll(
    @Query('page') page?: number,
    @Query('quantity') quantity?: number
  ): Promise<CompanyListResponse> {
    return this.service.findAll(page, quantity);
  }

  @Public()
  @Get(':uuid')
  @ApiOkResponse({ type: CompanyResponse })
  @HttpCode(200)
  async findByUuid(
    @Param('uuid') uuid: string
  ): Promise<CompanyResponse> {
    return this.service.findByUuid(uuid);
  }

  @Public()
  @Post()
  @ApiBody({ type: CompanyRequest, description: 'Company request' })
  @ApiCreatedResponse({ type: CompanyResponse })
  @HttpCode(201)
  async create(
    @Body() request: CompanyRequest
  ): Promise<CompanyResponse> {
    return this.service.create(request);
  }

  @Public()
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

  @Public()
  @Delete(':uuid')
  @ApiNoContentResponse()
  @HttpCode(204)
  async delete(
    @Param('uuid') uuid: string,
  ): Promise<void> {
    await this.service.delete(uuid);
  }
}