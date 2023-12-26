import { Injectable } from '@nestjs/common';
import { InjectRepository } from '../prisma/inject-repository.decorator';
import { PrismaRepository } from '../prisma/prisma.repository';
import { CompanyModel } from './company.model';

@Injectable()
export class CompanyRepository {
  constructor(
    @InjectRepository('company')
    private readonly repository: PrismaRepository['company'],
  ) { }

  async find() {
    return this.repository.findMany();
  }

  async findById(uuid: string) {
    return this.repository.findUnique({ where: { uuid: uuid } });
  }

  async create(data: CompanyModel) {
    return this.repository.create({ data });
  }

  async update(data: CompanyModel, uuid: string) {
    return this.repository.update({ where: { uuid: uuid }, data });
  }

  async delete(uuid: string) {
    return this.repository.delete({ where: { uuid: uuid } });
  }
}