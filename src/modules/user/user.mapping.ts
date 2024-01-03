import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { UserModel } from './dtos/user.model';
import { UserRequest } from './dtos/user.request';
import { UserResponse } from './dtos/user.response';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserMapping {
  constructor() { }

  async create(request: UserRequest, companyId: bigint): Promise<UserModel> {
    const hashedPassword = await this.hassPassword(request.password);

    const data: UserModel = {
      uuid: `USR-${uuid()}`,
      name: request.name,
      document: request.document,
      username: request.username,
      email: request.email,
      password: hashedPassword,
      status: request.status ? request.status : 'INACTIVE',
      accessLevel: request.accessLevel,
      companyId: companyId
    }

    return data;
  }

  update(model: UserModel, request: UserRequest): UserModel {
    model.name = request.name ?? model.name;
    model.document = request.document ?? model.document;
    model.username = request.username ?? model.username;
    model.email = request.email ?? model.email;
    model.password = request.password ?? model.password;
    model.status = request.status ?? model.status;
    model.accessLevel = request.accessLevel ?? model.accessLevel;
    model.updatedAt = new Date();
    return model;
  }

  response(model: UserModel): UserResponse {
    return {
      uuid: model.uuid,
      name: model.name,
      document: model.document,
      username: model.username,
      email: model.email,
      status: model.status,
      accessLevel: model.accessLevel,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt
    };
  }

  responseList(models: UserModel[]): UserResponse[] {
    return models.map((model: UserModel) => this.response(model));
  }

  private async hassPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }
}