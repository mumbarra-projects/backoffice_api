import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../company.repostiory';
import { CompanyResponse } from '../dtos/company.response';
import { CompanyModel } from '../dtos/company.model';

@Injectable()
export class FindAllCompany {
  constructor(
    private readonly repository: CompanyRepository,
  ) { }

  async execute(): Promise<CompanyResponse[]> {
    const models = await this.repository.find();
    return this.getMapResponse(models);
  }

  private getMapResponse(models: CompanyModel[]): CompanyResponse[] {
    return models.map((model: CompanyModel) => ({
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
    }));
  }
}