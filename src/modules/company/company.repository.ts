import { Injectable } from '@nestjs/common';
import { InjectRepository } from '../prisma/inject-repository.decorator';
import { PrismaRepository } from '../prisma/prisma.repository';
import { CompanyModel } from './dtos/company.model';

@Injectable()
export class CompanyRepository {
  constructor(
    @InjectRepository('company')
    private readonly repository: PrismaRepository['company'],
  ) { }

  async find() {
    return this.repository.findMany();
  }

  async findById(id: bigint) {
    return this.repository.findUnique({ where: { id: id } });
  }

  async findByUuid(uuid: string) {
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

  async existByDocument(document: string) {
    const company = this.repository.findUnique({ where: { document: document } })
    return company ? true : false;
  }

  async existByEmail(email: string) {
    const company = this.repository.findUnique({ where: { email: email } })
    return company ? true : false;
  }
}