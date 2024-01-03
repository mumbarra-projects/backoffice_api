import { Injectable } from '@nestjs/common';
import { IAuthService } from './auth.service.interface';
import { AuthResponse } from './dtos/auth.response';
import { Auth } from './useCases/auth';
import { AuthRequest } from './dtos/auth.request';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly authService: Auth,
  ) { }

  async auth(request: AuthRequest): Promise<AuthResponse> {
    return await this.authService.execute(request);
  }
}