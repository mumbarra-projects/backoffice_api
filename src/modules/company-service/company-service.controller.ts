import { ApiBody, ApiCreatedResponse, ApiExcludeEndpoint, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ICompanyServiceService } from './company-service.service.interface';
import { CompanyServiceRequest } from './dtos/company-service.request';
import { CompanyServiceResponse } from './dtos/company-service.response';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Company Service')
@Controller('company_service')
export class CompanyServiceController {
  constructor(
    @Inject('COMPANY_SERVICE_INTERFACE')
    private readonly service: ICompanyServiceService,
  ) { }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOkResponse({ isArray: true, type: CompanyServiceResponse })
  @HttpCode(200)
  async findAll(): Promise<CompanyServiceResponse[]> {
    return this.service.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':uuid')
  @ApiOkResponse({ type: CompanyServiceResponse })
  @HttpCode(200)
  async findByUuid(
    @Param('uuid') uuid: string
  ): Promise<CompanyServiceResponse> {
    return this.service.findByUuid(uuid);
  }

  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard)
  @Post()
  @ApiBody({ type: CompanyServiceRequest, description: 'Service request' })
  @ApiCreatedResponse({ type: CompanyServiceResponse })
  @HttpCode(201)
  async create(
    @Body() request: CompanyServiceRequest
  ): Promise<CompanyServiceResponse> {
    return this.service.create(request);
  }

  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  @Delete(':uuid')
  @ApiNoContentResponse()
  @HttpCode(204)
  async delete(
    @Param('uuid') uuid: string,
  ): Promise<void> {
    await this.service.delete(uuid);
  }
}