import { Public } from './../auth/decorators/public.decorator';
import { ApiBody, ApiCreatedResponse, ApiExcludeEndpoint, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Post, Put } from '@nestjs/common';
import { UserRequest } from './dtos/user.request';
import { UserResponse } from './dtos/user.response';
import { IUserService } from './user.service.interface';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    @Inject('USER_INTERFACE')
    private readonly service: IUserService,
  ) { }

  @Public()
  @Get()
  @ApiOkResponse({ isArray: true, type: UserResponse })
  @HttpCode(200)
  async findAll(): Promise<UserResponse[]> {
    return this.service.findAll();
  }

  @Public()
  @Get(':uuid')
  @ApiOkResponse({ type: UserResponse })
  @HttpCode(200)
  async findByUuid(
    @Param('uuid') uuid: string
  ): Promise<UserResponse> {
    return this.service.findByUuid(uuid);
  }

  @Public()
  @Post()
  @ApiBody({ type: UserRequest, description: 'Service request' })
  @ApiCreatedResponse({ type: UserResponse })
  @HttpCode(201)
  async create(
    @Body() request: UserRequest
  ): Promise<UserResponse> {
    return this.service.create(request);
  }

  @Public()
  @Put(':uuid')
  @ApiBody({ type: UserRequest, description: 'Service request' })
  @ApiOkResponse({ type: UserResponse })
  @HttpCode(200)
  async update(
    @Param('uuid') uuid: string,
    @Body() request: UserRequest
  ): Promise<UserResponse> {
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