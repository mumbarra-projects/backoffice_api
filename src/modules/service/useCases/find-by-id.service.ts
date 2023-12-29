import { Injectable, NotFoundException } from '@nestjs/common';
import { ServiceRepository } from '../service.repository';
import { ServiceResponse } from '../dtos/service.response';
import { ServiceMapping } from '../service.mapping';

@Injectable()
export class FindByIdService {
  constructor(
    private readonly repository: ServiceRepository,
    private readonly mapping: ServiceMapping,
  ) { }

  async execute(uuid: string): Promise<ServiceResponse> {
    const model = await this.repository.findByUuid(uuid);

    if (!model) {
      throw new NotFoundException('Service not found');
    }
    
    return this.mapping.response(model);
  }
}