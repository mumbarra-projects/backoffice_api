import { Injectable } from '@nestjs/common';
import { ServiceResponse } from '../dtos/service.response';
import { ServiceMapping } from '../service.mapping';
import { ServiceRepository } from '../service.repository';

@Injectable()
export class FindAllService {
  constructor(
    private readonly repository: ServiceRepository,
    private readonly mapping: ServiceMapping,
  ) { }

  async execute(): Promise<ServiceResponse[]> {
    const models = await this.repository.find();
    return this.mapping.responseList(models);
  }
}