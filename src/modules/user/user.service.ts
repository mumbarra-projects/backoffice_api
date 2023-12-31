import { Injectable } from '@nestjs/common';
import { UserRequest } from './dtos/user.request';
import { UserResponse } from './dtos/user.response';
import { CreateUser } from './useCases/create.user';
import { DeleteUser } from './useCases/delete.user';
import { FindAllUser } from './useCases/find-all-user';
import { FindByIdUser } from './useCases/find-user-by-id';
import { UpdateUser } from './useCases/update.user';
import { IUserService } from './user.service.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly findAllService: FindAllUser,
    private readonly findByIdService: FindByIdUser,
    private readonly createService: CreateUser,
    private readonly updateService: UpdateUser,
    private readonly deleteService: DeleteUser,
  ) { }

  async findAll(): Promise<UserResponse[]> {
    return this.findAllService.execute();
  }

  async findByUuid(uuid: string): Promise<UserResponse> {
    return this.findByIdService.execute(uuid);
  }

  async create(request: UserRequest): Promise<UserResponse> {
    return this.createService.execute(request);
  }

  async update(request: UserRequest, uuid: string): Promise<UserResponse> {
    return this.updateService.execute(request, uuid);
  }

  async delete(uuid: string): Promise<void> {
    await this.deleteService.execute(uuid);
  }
}