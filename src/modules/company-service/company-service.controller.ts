import { ApiBody, ApiCreatedResponse, ApiExcludeEndpoint, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Post, Put } from '@nestjs/common';
import { ICompanyServiceService } from './company-service.service.interface';
import { CompanyServiceRequest } from './dtos/company-service.request';
import { CompanyServiceResponse } from './dtos/company-service.response';

@ApiTags('Company Service')
@Controller('company_service')
export class CompanyServiceController {
  constructor(
    @Inject('COMPANY_SERVICE_INTERFACE')
    private readonly service: ICompanyServiceService,
  ) { }

  @Get()
  @ApiOkResponse({ isArray: true, type: CompanyServiceResponse })
  @HttpCode(200)
  async findAll(): Promise<CompanyServiceResponse[]> {
    return this.service.findAll();
  }

  @Get(':uuid')
  @ApiOkResponse({ type: CompanyServiceResponse })
  @HttpCode(200)
  async findByUuid(
    @Param('uuid') uuid: string
  ): Promise<CompanyServiceResponse> {
    return this.service.findByUuid(uuid);
  }

  @Post()
  @ApiBody({ type: CompanyServiceRequest, description: 'Service request' })
  @ApiCreatedResponse({ type: CompanyServiceResponse })
  @HttpCode(201)
  async create(
    @Body() request: CompanyServiceRequest
  ): Promise<CompanyServiceResponse> {
    return this.service.create(request);
  }

  @Put(':uuid')
  @ApiBody({ type: CompanyServiceRequest, description: 'Service request' })
  @ApiOkResponse({ type: CompanyServiceResponse })
  @HttpCode(200)
  async update(
    @Param('uuid') uuid: string,
    @Body() request: CompanyServiceRequest
  ): Promise<CompanyServiceResponse> {
    return this.service.update(request, uuid);
  }

  @ApiExcludeEndpoint()
  @Delete(':uuid')
  @ApiNoContentResponse()
  @HttpCode(204)
  async delete(
    @Param('uuid') uuid: string,
  ): Promise<void> {
    await this.service.delete(uuid);
  }
}