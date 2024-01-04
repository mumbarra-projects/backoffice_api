import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { CompanyModule } from '../company/company.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { SignIn } from './useCases/sign-in';

@Module({
  controllers: [
    AuthController
  ],
  imports: [
    UserModule,
    CompanyModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    AuthService,
    {
      provide: 'AUTH_INTERFACE',
      useFactory: (AuthService: AuthService) => AuthService,
      inject: [AuthService]
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    SignIn,
  ],
  exports: [
    AuthService,
  ]
})
export class AuthModule { }