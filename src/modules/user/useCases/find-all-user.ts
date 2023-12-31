import { Injectable } from '@nestjs/common';
import { UserResponse } from '../dtos/user.response';
import { UserRepository } from '../user.repository';
import { UserMapping } from '../user.mapping';

@Injectable()
export class FindAllUser {
  constructor(
    private readonly repository: UserRepository,
    private readonly mapping: UserMapping,
  ) { }

  async execute(): Promise<UserResponse[]> {
    const models = await this.repository.find();
    return this.mapping.responseList(models);
  }
}