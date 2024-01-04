import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CompanyServiceRequest } from '../dtos/company-service.request';
import { CompanyServiceResponse } from '../dtos/company-service.response';
import { CompanyServiceRepository } from '../company-service.repository';
import { CompanyRepository } from '@app/modules/company/company.repository';
import { ServiceRepository } from '@app/modules/service/service.repository';
import { CompanyServiceMapping } from '../company-service.mapping';
import { CompanyServiceModel } from '../dtos/company-service.model';

@Injectable()
export class CreateCompanyService {
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

    await this.validateExist(data);

    const model = await this.repository.create(data);
    return this.mapping.response(model, company, service);
  }

  private async validateExist(data: CompanyServiceModel) {
    const existByApikey = await this.repository.existByApikey(data.apikey);

    if (existByApikey) {
      throw new BadRequestException('Company Service with this apikey already exists');
    }
  }
}