import { CompanyRepository } from '@app/modules/company/company.repository';
import { UserRepository } from '@app/modules/user/user.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthRequest } from '../dtos/auth.request';
import { AuthResponse } from '../dtos/auth.response';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class Auth {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly jwtService: JwtService
  ) { }

  async execute(request: AuthRequest): Promise<AuthResponse> {

    const hashedPassword = await this.hassPassword(request.password);

    const user = await this.userRepository.findByUsername(request.username);
    let company;
    if (user) {
      company = await this.companyRepository.findById(user.companyId);
    }

    if (user.username !== request.username && user.password !== hashedPassword) {
      throw new NotFoundException('Invalid username or password');
    }

    const payload = {
      sub: user.uuid,
      username: user.username,
      email: user.email,
      companyId: company.uuid
    }

    const token = this.jwtService.sign(payload);

    const response = new AuthResponse();
    response.access_token = token;
    
    return response;
  }

  private async hassPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }
}