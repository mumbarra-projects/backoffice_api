import { Injectable } from '@nestjs/common';
import { ServiceRequest } from '../dtos/service.request';
import { ServiceResponse } from '../dtos/service.response';
import { ServiceMapping } from '../service.mapping';
import { ServiceRepository } from '../service.repository';

@Injectable()
export class CreateService {
  constructor(
    private readonly repository: ServiceRepository,
    private readonly mapping: ServiceMapping,
  ) { }

  async execute(request: ServiceRequest): Promise<ServiceResponse> {

    const data = this.mapping.create(request);

    const model = await this.repository.create(data);
    return this.mapping.response(model);
  }
}