import { Injectable, NotFoundException } from '@nestjs/common';
import { ServiceRepository } from '../service.repostiory';

@Injectable()
export class DeleteService {
  constructor(
    private readonly repository: ServiceRepository,
  ) { }

  async execute(uuid: string): Promise<void> {
    const model = await this.repository.findById(uuid);

    if (!model) {
      throw new NotFoundException('Service not found');
    }

    this.repository.delete(uuid);
  }
}