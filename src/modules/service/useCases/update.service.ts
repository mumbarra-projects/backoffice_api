import { Injectable, NotFoundException } from '@nestjs/common';
import { ServiceRequest } from '../dtos/service.request';
import { ServiceResponse } from '../dtos/service.response';
import { ServiceRepository } from '../service.repository';
import { ServiceMapping } from '../service.mapping';

@Injectable()
export class UpdateService {
  constructor(
    private readonly repository: ServiceRepository,
    private readonly mapping: ServiceMapping,
  ) { }

  async execute(request: ServiceRequest, uuid: string): Promise<ServiceResponse> {

    const model = await this.repository.findByUuid(uuid);

    if (!model) {
      throw new NotFoundException('Service not found');
    }

    const data = this.mapping.update(model, request);

    const result = await this.repository.update(data, uuid);
    return this.mapping.response(result);
  }
}