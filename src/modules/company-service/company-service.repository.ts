import { Injectable } from '@nestjs/common';
import { InjectRepository } from '../prisma/inject-repository.decorator';
import { PrismaRepository } from '../prisma/prisma.repository';
import { CompanyServiceModel } from './dtos/company-service.model';

@Injectable()
export class CompanyServiceRepository {
  constructor(
    @InjectRepository('company_service')
    private readonly repository: PrismaRepository['company_service'],
  ) { }

  async find() {
    return this.repository.findMany();
  }

  async findByUuid(uuid: string) {
    return this.repository.findUnique({ where: { uuid: uuid } });
  }

  async create(data: CompanyServiceModel) {
    return this.repository.create({ data });
  }

  async update(data: CompanyServiceModel, uuid: string) {
    return this.repository.update({ where: { uuid: uuid }, data });
  }

  async delete(uuid: string) {
    return this.repository.delete({ where: { uuid: uuid } });
  }
}