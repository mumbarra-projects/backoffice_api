import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRequest } from '../dtos/user.request';
import { UserResponse } from '../dtos/user.response';
import { UserRepository } from '../user.repository';
import { UserMapping } from '../user.mapping';

@Injectable()
export class UpdateUser {
  constructor(
    private readonly repository: UserRepository,
    private readonly mapping: UserMapping,
  ) { }

  async execute(request: UserRequest, uuid: string): Promise<UserResponse> {

    const model = await this.repository.findByUuid(uuid);

    if (!model) {
      throw new NotFoundException('User not found');
    }

    const data = this.mapping.update(model, request);

    const result = await this.repository.update(data, uuid);
    return this.mapping.response(result)
  }
}