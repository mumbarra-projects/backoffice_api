import { Injectable } from '@nestjs/common';
import { IAuthService } from './auth.service.interface';
import { AuthResponse } from './dtos/auth.response';
import { AuthRequest } from './dtos/auth.request';
import { SignIn } from './useCases/sign-in';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly authService: SignIn,
  ) { }

  async signIn(request: AuthRequest): Promise<AuthResponse> {
    return await this.authService.execute(request);
  }
}