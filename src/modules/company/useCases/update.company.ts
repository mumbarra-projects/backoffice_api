import { Injectable, NotFoundException } from '@nestjs/common';
import { CompanyRepository } from '../company.repository';
import { CompanyResponse } from '../dtos/company.response';
import { CompanyRequest } from '../dtos/company.request';
import { CompanyMapping } from '../company.mapping';

@Injectable()
export class UpdateCompany {
  constructor(
    private readonly repository: CompanyRepository,
    private readonly mapping: CompanyMapping,
  ) { }

  async execute(request: CompanyRequest, uuid: string): Promise<CompanyResponse> {

    const model = await this.repository.findByUuid(uuid);

    if (!model) {
      throw new NotFoundException('Company not found');
    }

    const data = this.mapping.update(model, request);

    const result = await this.repository.update(data, uuid);
    return this.mapping.response(result);
  }
}