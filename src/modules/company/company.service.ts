import { Injectable } from '@nestjs/common';
import { CompanyRepository } from './company.repostiory';
import { CompanyResponse } from './dtos/company.response';
import { FindAllCompany } from './useCases/find-all-company';

@Injectable()
export class CompanyService {
  constructor(
    private readonly findAllCompany: FindAllCompany,
  ) { }

  async findAll(): Promise<CompanyResponse[]> {
    return this.findAllCompany.execute();
  }
}