import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../company.repository';
import { CompanyResponse } from '../dtos/company.response';
import { CompanyModel } from '../dtos/company.model';
import { CompanyMapping } from '../company.mapping';

@Injectable()
export class FindAllCompany {
  constructor(
    private readonly repository: CompanyRepository,
    private readonly mapping: CompanyMapping,
  ) { }

  async execute(): Promise<CompanyResponse[]> {
    const models = await this.repository.find();
    return this.mapping.responseList(models);
  }
}