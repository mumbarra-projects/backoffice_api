import { Injectable, NotFoundException } from '@nestjs/common';
import { CompanyRepository } from '../company.repostiory';
import { CompanyResponse } from '../dtos/company.response';
import { CompanyModel } from '../dtos/company.model';

@Injectable()
export class FindByIdCompany {
  constructor(
    private readonly repository: CompanyRepository,
  ) { }

  async execute(uuid: string): Promise<CompanyResponse> {
    const model = await this.repository.findById(uuid);

    if (!model) {
      throw new NotFoundException('Company not found');
    }
    return this.getMap(model);
  }

  private getMap(model: CompanyModel): CompanyResponse {
    return {
      uuid: model.uuid,
      name: model.name,
      businessName: model.businessName,
      document: model.document,
      address: model.address,
      zipCode: model.zipCode,
      phone: model.phone,
      email: model.email,
      status: model.status,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt
    };
  }
}