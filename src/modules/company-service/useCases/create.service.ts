import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CompanyServiceRequest } from '../dtos/company-service.request';
import { CompanyServiceModel } from '../dtos/company-service.model';
import { CompanyServiceResponse } from '../dtos/company-service.response';
import { CompanyServiceRepository } from '../company-service.repository';
import { CompanyRepository } from '@app/modules/company/company.repository';
import { ServiceRepository } from '@app/modules/service/service.repository';
import { CompanyServiceMapping } from '../company-service.mapping';

@Injectable()
export class CreateService {
  constructor(
    private readonly repository: CompanyServiceRepository,
    private readonly mapping: CompanyServiceMapping,
    private readonly companyRepository: CompanyRepository,
    private readonly serviceRepository: ServiceRepository,
  ) { }

  async execute(request: CompanyServiceRequest): Promise<CompanyServiceResponse> {

    const company = await this.companyRepository.findByUuid(request.companyId);
    const service = await this.serviceRepository.findByUuid(request.serviceId);

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    const data = this.mapping.create(request, company.id, service.id);

    const model = await this.repository.create(data);
    return this.mapping.response(model, company, service);
  }
}