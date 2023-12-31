import { create } from 'domain';
import { UserRequest } from './dtos/user.request';
import { UserResponse } from './dtos/user.response';

export interface IUserService {
  findAll(): Promise<UserResponse[]>;
  findByUuid(uuid: string): Promise<UserResponse>;
  create(request: UserRequest): Promise<UserResponse>;
  update(request: UserRequest, uuid: string): Promise<UserResponse>;
  delete(uuid: string): Promise<void>;
}