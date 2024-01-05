import { Injectable } from '@nestjs/common';
import { CompanyModel } from './dtos/company.model';
import { CompanyResponse } from './dtos/company.response';
import { CompanyRequest } from './dtos/company.request';
import { v4 as uuid } from 'uuid';
import { CompanyListResponse } from './dtos/company-list.response';

@Injectable()
export class CompanyMapping {
  constructor() { }

  create(request: CompanyRequest): CompanyModel {
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

    return data;
  }

  update(model: CompanyModel, request: CompanyRequest): CompanyModel {
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

  response(model: CompanyModel): CompanyResponse {
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

  responseList(models: CompanyModel[], count: number, page: number, quantity: number): CompanyListResponse {
    const responses = models.map((model: CompanyModel) => this.response(model));
    return {
      count: count,
      page: page,
      quantity: quantity,
      data: responses
    };
  }
}