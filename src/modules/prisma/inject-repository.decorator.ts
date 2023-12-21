import { PrismaClient } from '@prisma/client';
import { PrismaRepository } from './prisma.repository';
import { Inject } from '@nestjs/common';

const prismaRepositories = new Set<PrismaDelegateNames>();

export function createRepoisitoryProviders() {
  return [...prismaRepositories].map((name: string) => {
    return {
      provide: `${name}PrismaRepository`,
      inject: [PrismaRepository],
      useFactory: (prisma: PrismaRepository) => prisma[name],
    }
  });
}

export function InjectRepository(name: PrismaDelegateNames) {
  prismaRepositories.add(name);
  return Inject(`${name as string}PrismaRepository`);
}

export type PrismaDelegateNames = keyof {
  [P in keyof PrismaClient as PrismaClient[P] extends any ? P : never]: PrismaClient[P];
}