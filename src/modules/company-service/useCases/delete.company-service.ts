import { ServiceRepository } from '@app/modules/service/service.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class DeleteCompanyService {
  constructor(
    private readonly repository: ServiceRepository,
  ) { }

  async execute(uuid: string): Promise<void> {
    const model = await this.repository.findByUuid(uuid);

    if (!model) {
      throw new NotFoundException('Service not found');
    }

    this.repository.delete(uuid);
  }
}