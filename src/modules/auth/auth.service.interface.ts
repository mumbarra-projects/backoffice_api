import { AuthRequest } from './dtos/auth.request';
import { AuthResponse } from './dtos/auth.response';

export interface IAuthService {
  signIn(request: AuthRequest): Promise<AuthResponse>;
}