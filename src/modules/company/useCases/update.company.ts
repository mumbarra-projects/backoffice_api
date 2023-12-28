import { Injectable, NotFoundException } from '@nestjs/common';
import { CompanyRepository } from '../company.repostiory';
import { CompanyResponse } from '../dtos/company.response';
import { CompanyModel } from '../dtos/company.model';
import { CompanyRequest } from '../dtos/company.request';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UpdateCompany {
  constructor(
    private readonly repository: CompanyRepository,
  ) { }

  async execute(request: CompanyRequest, uuid: string): Promise<CompanyResponse> {

    const model = await this.repository.findById(uuid);

    if (!model) {
      throw new NotFoundException('Company not found');
    }

    const data = this.getMapModel(model, request);

    const result = await this.repository.update(data, uuid);
    return this.getMapResponse(result);
  }

  private getMapModel(model: CompanyModel, request: CompanyRequest): CompanyModel {
    model.name = request.name ?? model.name;
    model.businessName = request.businessName ?? model.businessName;
    model.document = request.document ?? model.document;
    model.address = request.address ?? model.address;
    model.zipCode = request.zipCode ?? model.zipCode;
    model.phone = request.phone ?? model.phone;
    model.email = request.email ?? model.email;
    model.status = request.status ?? model.status;
    model.updatedAt = new Date();
    return model;
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