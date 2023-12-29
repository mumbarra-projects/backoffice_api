import { CompanyRepository } from '@app/modules/company/company.repository';
import { ServiceRepository } from '@app/modules/service/service.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CompanyServiceMapping } from '../company-service.mapping';
import { CompanyServiceRepository } from '../company-service.repository';
import { CompanyServiceResponse } from '../dtos/company-service.response';

@Injectable()
export class FindByIdService {
  constructor(
    private readonly repository: CompanyServiceRepository,
    private readonly mapping: CompanyServiceMapping,
    private readonly companyRepository: CompanyRepository,
    private readonly serviceRepository: ServiceRepository,
  ) { }

  async execute(uuid: string): Promise<CompanyServiceResponse> {
    const model = await this.repository.findByUuid(uuid);

    const company = await this.companyRepository.findById(model.companyId);
    const service = await this.serviceRepository.findById(model.companyId);

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    if (!model) {
      throw new NotFoundException('Company Service not found');
    }

    return this.mapping.response(model, company, service);
  }
}