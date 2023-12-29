import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CompanyServiceModel } from './dtos/company-service.model';
import { CompanyServiceRequest } from './dtos/company-service.request';
import { CompanyServiceResponse } from './dtos/company-service.response';
import { CompanyModel } from '../company/dtos/company.model';
import { ServiceModel } from '../service/dtos/service.model';
import { CompanyMapping } from '../company/company.mapping';
import { ServiceMapping } from '../service/service.mapping';

@Injectable()
export class CompanyServiceMapping {
  constructor(
    private readonly companyMapping: CompanyMapping,
    private readonly serviceMapping: ServiceMapping,
  ) { }

  create(request: CompanyServiceRequest, companyId: bigint, serviceId: bigint ): CompanyServiceModel {
    const data: CompanyServiceModel = {
      uuid: `CSV-${uuid()}`,
      apikey: `${request.key}-${uuid()}`,
      companyId: companyId,
      serviceId: serviceId,
      status: request.status ? request.status : 'PENDING',
    }

    return data;
  }

  update(model: CompanyServiceModel, request: CompanyServiceRequest, companyId: bigint, serviceId: bigint): CompanyServiceModel {
    model.apikey = request.apikey ?? model.apikey;
    model.companyId = companyId ?? model.companyId;
    model.serviceId = serviceId ?? model.serviceId;
    model.status = request.status ?? model.status;
    model.updatedAt = new Date();
    return model;
  }

  response(model: CompanyServiceModel, company?: CompanyModel, service?: ServiceModel): CompanyServiceResponse {
    return {
      uuid: model.uuid,
      apikey: model.apikey,
      company: company ? this.companyMapping.response(company) : null,
      service: service ? this.serviceMapping.response(service) : null,
      status: model.status,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt
    };
  }

  responseList(models: CompanyServiceModel[]): CompanyServiceResponse[] {
    return models.map((model: CompanyServiceModel) => this.response(model));
  }
}