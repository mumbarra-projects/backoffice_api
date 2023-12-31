import { Injectable, NotFoundException } from '@nestjs/common';
import { UserResponse } from '../dtos/user.response';
import { UserRepository } from '../user.repository';
import { UserMapping } from '../user.mapping';

@Injectable()
export class FindByIdUser {
  constructor(
    private readonly repository: UserRepository,
    private readonly mapping: UserMapping,
  ) { }

  async execute(uuid: string): Promise<UserResponse> {
    const model = await this.repository.findByUuid(uuid);

    if (!model) {
      throw new NotFoundException('User not found');
    }

    return this.mapping.response(model);
  }
}