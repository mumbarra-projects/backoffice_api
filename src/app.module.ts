import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { validate } from './config/validation';
import { CompanyModule } from './modules/company/company.module';
import { ServiceModule } from './modules/service/service.module';
import { CompanyServiceModule } from './modules/company-service/company-service.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true, validate }),
    PrismaModule.register({ logQueries: false }),
    AuthModule,
    CompanyModule,
    CompanyServiceModule,
    ServiceModule,
    UserModule,
  ],
})
export class AppModule { }
