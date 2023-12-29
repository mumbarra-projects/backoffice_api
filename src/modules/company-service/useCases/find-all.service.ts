import { Injectable } from '@nestjs/common';
import { CompanyServiceMapping } from '../company-service.mapping';
import { CompanyServiceRepository } from '../company-service.repository';
import { CompanyServiceResponse } from '../dtos/company-service.response';

@Injectable()
export class FindAllService {
  constructor(
    private readonly repository: CompanyServiceRepository,
    private readonly mapping: CompanyServiceMapping,
  ) { }

  async execute(): Promise<CompanyServiceResponse[]> {
    const models = await this.repository.find();
    return this.mapping.responseList(models);
  }
}