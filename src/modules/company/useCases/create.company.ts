import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../company.repository';
import { CompanyResponse } from '../dtos/company.response';
import { CompanyRequest } from '../dtos/company.request';
import { CompanyMapping } from '../company.mapping';

@Injectable()
export class CreateCompany {
  constructor(
    private readonly repository: CompanyRepository,
    private readonly mapping: CompanyMapping,
  ) { }

  async execute(request: CompanyRequest): Promise<CompanyResponse> {

    const data = this.mapping.create(request);

    const model = await this.repository.create(data);
    return this.mapping.response(model);
  }
}