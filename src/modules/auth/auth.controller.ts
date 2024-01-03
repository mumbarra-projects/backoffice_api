import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { IAuthService } from './auth.service.interface';
import { AuthRequest } from './dtos/auth.request';
import { AuthResponse } from './dtos/auth.response';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_INTERFACE')
    private readonly service: IAuthService,
  ) { }

  @Post()
  @ApiBody({ type: AuthRequest, description: 'Auth request' })
  @ApiCreatedResponse({ type: AuthResponse })
  @HttpCode(200)
  async create(
    @Body() request: AuthRequest
  ): Promise<AuthResponse> {
    return this.service.auth(request);
  }
}