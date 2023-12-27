import * as bodyParser from 'body-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { version } from 'uuid';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '1mb' }));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, validateCustomDecorators: true }));

  const configService = app.get(ConfigService);

  app.setGlobalPrefix('');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.enableCors({ origin: '*' });

  const documentBuilder = new DocumentBuilder()
    .setTitle('Backoffice Microservice')
    .setDescription(
      "The backoffice microservice is designed to facilitate the management of a company's internal operations, including administrative tasks, user management and access control."
    )
    .setVersion(process.env.APP_VERSION)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('/swagger', app, document);

  await app.listen(configService.get('APP_PORT'));
  Logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
