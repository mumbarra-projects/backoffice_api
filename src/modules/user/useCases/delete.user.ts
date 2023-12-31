import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../user.repository';

@Injectable()
export class DeleteUser {
  constructor(
    private readonly repository: UserRepository,
  ) { }

  async execute(uuid: string): Promise<void> {
    const model = await this.repository.findByUuid(uuid);

    if (!model) {
      throw new NotFoundException('User not found');
    }

    this.repository.delete(uuid);
  }
}