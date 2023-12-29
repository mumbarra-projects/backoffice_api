import { CompanyRepository } from '@app/modules/company/company.repository';
import { ServiceRepository } from '@app/modules/service/service.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CompanyServiceMapping } from '../company-service.mapping';
import { CompanyServiceRepository } from '../company-service.repository';
import { CompanyServiceRequest } from '../dtos/company-service.request';
import { CompanyServiceResponse } from '../dtos/company-service.response';

@Injectable()
export class UpdateService {
  constructor(
    private readonly repository: CompanyServiceRepository,
    private readonly mapping: CompanyServiceMapping,
    private readonly companyRepository: CompanyRepository,
    private readonly serviceRepository: ServiceRepository,
  ) { }

  async execute(request: CompanyServiceRequest, uuid: string): Promise<CompanyServiceResponse> {

    const model = await this.repository.findByUuid(uuid);

    const company = await this.companyRepository.findByUuid(request.companyId);
    const service = await this.serviceRepository.findByUuid(request.serviceId);

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    if (!model) {
      throw new NotFoundException('Company Service not found');
    }

    const data = this.mapping.update(model, request, company.id, service.id);

    const result = await this.repository.update(data, uuid);
    return this.mapping.response(result, company, service)
  }
}