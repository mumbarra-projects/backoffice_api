import { Injectable } from '@nestjs/common';
import { CompanyRepository } from './company.repostiory';
import { CompanyResponse } from './dtos/company.response';
import { FindByIdCompany } from './useCases/find-by-id.company';
import { FindAllCompany } from './useCases/find-all.company';
import { CompanyRequest } from './dtos/company.request';
import { CreateCompany } from './useCases/create.company';
import { UpdateCompany } from './useCases/update.company';
import { ICompanyService } from './company.service.interface';
import { DeleteCompany } from './useCases/delete.company ';

@Injectable()
export class CompanyService implements ICompanyService {
  constructor(
    private readonly findAllCompany: FindAllCompany,
    private readonly findByIdCompany: FindByIdCompany,
    private readonly createCompany: CreateCompany,
    private readonly updateCompany: UpdateCompany,
    private readonly deleteCompany: DeleteCompany,
  ) { }

  async findAll(): Promise<CompanyResponse[]> {
    return this.findAllCompany.execute();
  }

  async findById(uuid: string): Promise<CompanyResponse> {
    return this.findByIdCompany.execute(uuid);
  }

  async create(request: CompanyRequest): Promise<CompanyResponse> {
    return this.createCompany.execute(request);
  }

  async update(request: CompanyRequest, uuid: string): Promise<CompanyResponse> {
    return this.updateCompany.execute(request, uuid);
  }

  async delete(uuid: string): Promise<void> {
    await this.deleteCompany.execute(uuid);
  }
}