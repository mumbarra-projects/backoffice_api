import { Injectable } from '@nestjs/common';
import { InjectRepository } from '../prisma/inject-repository.decorator';
import { PrismaRepository } from '../prisma/prisma.repository';
import { UserModel } from './dtos/user.model';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository('user')
    private readonly repository: PrismaRepository['user'],
  ) { }

  async find() {
    return this.repository.findMany();
  }

  async findByUuid(uuid: string) {
    return this.repository.findUnique({ where: { uuid: uuid } });
  }

  async findByUsername(username: string) {
    return this.repository.findUnique({ where: { username: username } });
  }

  async create(data: UserModel) {
    return this.repository.create({ data });
  }

  async update(data: UserModel, uuid: string) {
    return this.repository.update({ where: { uuid: uuid }, data });
  }

  async delete(uuid: string) {
    return this.repository.delete({ where: { uuid: uuid } });
  }

  async existByUsername(username: string) {
    const user = this.repository.findUnique({ where: { username: username } })
    return user ? true : false;
  }

  async existByDocument(document: string) {
    const user = this.repository.findUnique({ where: { document: document } })
    return user ? true : false;
  }

  async existByEmail(email: string) {
    const user = this.repository.findUnique({ where: { email: email } })
    return user ? true : false;
  }
}