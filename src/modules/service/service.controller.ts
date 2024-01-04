import { ApiBody, ApiCreatedResponse, ApiExcludeEndpoint, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ServiceRequest } from './dtos/service.request';
import { ServiceResponse } from './dtos/service.response';
import { IServiceService } from './service.service.interface';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Service')
@Controller('service')
export class ServiceController {
  constructor(
    @Inject('SERVICE_INTERFACE')
    private readonly service: IServiceService,
  ) { }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOkResponse({ isArray: true, type: ServiceResponse })
  @HttpCode(200)
  async findAll(): Promise<ServiceResponse[]> {
    return this.service.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':uuid')
  @ApiOkResponse({ type: ServiceResponse })
  @HttpCode(200)
  async findByUuid(
    @Param('uuid') uuid: string
  ): Promise<ServiceResponse> {
    return this.service.findByUuid(uuid);
  }

  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard)
  @Post()
  @ApiBody({ type: ServiceRequest, description: 'Service request' })
  @ApiCreatedResponse({ type: ServiceResponse })
  @HttpCode(201)
  async create(
    @Body() request: ServiceRequest
  ): Promise<ServiceResponse> {
    return this.service.create(request);
  }

  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard)
  @Put(':uuid')
  @ApiBody({ type: ServiceRequest, description: 'Service request' })
  @ApiOkResponse({ type: ServiceResponse })
  @HttpCode(200)
  async update(
    @Param('uuid') uuid: string,
    @Body() request: ServiceRequest
  ): Promise<ServiceResponse> {
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