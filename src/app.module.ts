import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { validate } from './config/validation';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true, validate }),
    PrismaModule.register({ logQueries: false }),
  ],
})
export class AppModule { }
