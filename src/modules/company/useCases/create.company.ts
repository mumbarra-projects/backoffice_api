import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../company.repostiory';
import { CompanyResponse } from '../dtos/company.response';
import { CompanyModel } from '../dtos/company.model';
import { CompanyRequest } from '../dtos/company.request';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CreateCompany {
  constructor(
    private readonly repository: CompanyRepository,
  ) { }

  async execute(request: CompanyRequest): Promise<CompanyResponse> {

    const data: CompanyModel = {
      uuid: `COP-${uuid()}`,
      name: request.name,
      businessName: request.businessName,
      document: request.document,
      address: request.address,
      zipCode: request.zipCode,
      phone: request.phone,
      email: request.email,
      status: request.status ? request.status : 'INACTIVE',
    }

    const model = await this.repository.create(data);
    return this.getMapResponse(model);
  }

  private getMapResponse(model: CompanyModel): CompanyResponse {
    return ({
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
    });
  }
}