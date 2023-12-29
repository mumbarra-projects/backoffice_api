import { Injectable, NotFoundException } from '@nestjs/common';
import { CompanyRepository } from '../company.repository';
import { CompanyResponse } from '../dtos/company.response';
import { CompanyMapping } from '../company.mapping';

@Injectable()
export class FindByIdCompany {
  constructor(
    private readonly repository: CompanyRepository,
    private readonly mapping: CompanyMapping,
  ) { }

  async execute(uuid: string): Promise<CompanyResponse> {
    const model = await this.repository.findByUuid(uuid);

    if (!model) {
      throw new NotFoundException('Company not found');
    }

    return this.mapping.response(model);
  }
}