import { DynamicModule, Module } from '@nestjs/common';
import { PRISMA_OPTIONS, PrismaModuleAsyncOptions, PrismaModuleOptions, createAsyncProviders, defaultPrismaOptions } from './prisma.providers';
import { createRepoisitoryProviders } from './inject-repository.decorator';
import { PrismaRepository } from './prisma.repository';

@Module({})
export class PrismaModule {
  static register(options: PrismaModuleOptions): DynamicModule {
    const repositoryProviers = createRepoisitoryProviders();
    options = { ...defaultPrismaOptions, ...options };
    return {
      global: true,
      module: PrismaModule,
      providers: [
        {
          provide: PRISMA_OPTIONS,
          useValue: options,
        },
        PrismaRepository,
        ...repositoryProviers,
      ],
      exports: [...repositoryProviers, PrismaRepository]
    };
  }

  static registerAsync(options: PrismaModuleAsyncOptions): DynamicModule {
    const repositoryProviers = createRepoisitoryProviders();
    return {
      global: true,
      module: PrismaModule,
      imports: options.imports || [],
      providers: [
        ...createAsyncProviders(options),
        ...repositoryProviers,
        PrismaRepository,
      ],
      exports: [...repositoryProviers, PrismaRepository],
    };
  }
}