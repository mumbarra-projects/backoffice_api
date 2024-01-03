import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Auth } from './useCases/auth';
import { JwtService } from '@nestjs/jwt';
import { CompanyModule } from '../company/company.module';

@Module({
  controllers: [
    AuthController
  ],
  imports: [
    UserModule,
    CompanyModule
  ],
  providers: [
    AuthController,
    AuthService,
    {
      provide: 'AUTH_INTERFACE',
      useFactory: (AuthService: AuthService) => AuthService,
      inject: [AuthService]
    },
    Auth,
    JwtService
  ],
  exports: [
    AuthService,
  ]
})
export class AuthModule { }