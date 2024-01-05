import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../company.repository';
import { CompanyResponse } from '../dtos/company.response';
import { CompanyModel } from '../dtos/company.model';
import { CompanyMapping } from '../company.mapping';
import { CompanyListResponse } from '../dtos/company-list.response';

@Injectable()
export class FindAllCompany {
  constructor(
    private readonly repository: CompanyRepository,
    private readonly mapping: CompanyMapping,
  ) { }

  async execute(page?: number, quantity?: number): Promise<CompanyListResponse> {
    const pageParsed = parseInt(page?.toString() || '1', 10);
    const quantityParsed = parseInt(quantity?.toString() || '10', 10);

    const skip = (pageParsed - 1) * quantityParsed;
    const take = quantityParsed;

    const models = await this.repository.find(skip, take);
    const count = await this.repository.count();
    
    return this.mapping.responseList(models, count, page, quantity);
  }
}