import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { IAuthService } from './auth.service.interface';
import { AuthRequest } from './dtos/auth.request';
import { AuthResponse } from './dtos/auth.response';
import { Public } from './decorators/public.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_INTERFACE')
    private readonly service: IAuthService,
  ) { }

  @Public()
  @Post()
  @ApiBody({ type: AuthRequest, description: 'Auth request' })
  @ApiCreatedResponse({ type: AuthResponse })
  @HttpCode(HttpStatus.OK)
  async create(
    @Body() request: AuthRequest
  ): Promise<AuthResponse> {
    return this.service.signIn(request);
  }
}