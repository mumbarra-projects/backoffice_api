import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRequest } from '../dtos/user.request';
import { UserResponse } from '../dtos/user.response';
import { UserRepository } from '../user.repository';
import { UserMapping } from '../user.mapping';
import { UserModel } from '../dtos/user.model';

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

    await this.validateExist(request, model);

    const data = this.mapping.update(model, request);

    const result = await this.repository.update(data, uuid);
    return this.mapping.response(result)
  }

  private async validateExist(request: UserRequest, model: UserModel) {
    if (request.username !== model.username) {
      const existUsername = await this.repository.existByUsername(request.username);

      if (existUsername) {
        throw new BadRequestException('User with this username already exists');
      }
    }

    if (request.document !== model.document) {
      const existByDocument = await this.repository.existByDocument(request.document);

      if (existByDocument) {
        throw new BadRequestException('User with this document already exists');
      }
    }

    if (request.email && request.email !== model.email) {
      const existByEmail = await this.repository.existByEmail(request.email);

      if (existByEmail) {
        throw new BadRequestException('User with this email already exists');
      }
    }
  }
}