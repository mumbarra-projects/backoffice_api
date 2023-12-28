import { Injectable } from '@nestjs/common';
import { InjectRepository } from '../prisma/inject-repository.decorator';
import { PrismaRepository } from '../prisma/prisma.repository';
import { ServiceModel } from './dtos/service.model';

@Injectable()
export class ServiceRepository {
  constructor(
    @InjectRepository('service')
    private readonly repository: PrismaRepository['service'],
  ) { }

  async find() {
    return this.repository.findMany();
  }

  async findById(uuid: string) {
    return this.repository.findUnique({ where: { uuid: uuid } });
  }

  async create(data: ServiceModel) {
    return this.repository.create({ data });
  }

  async update(data: ServiceModel, uuid: string) {
    return this.repository.update({ where: { uuid: uuid }, data });
  }

  async delete(uuid: string) {
    return this.repository.delete({ where: { uuid: uuid } });
  }
}