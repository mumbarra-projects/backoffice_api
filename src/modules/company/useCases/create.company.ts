import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../company.repository';
import { CompanyResponse } from '../dtos/company.response';
import { CompanyRequest } from '../dtos/company.request';
import { CompanyMapping } from '../company.mapping';
import { CompanyServiceService } from '@app/modules/company-service/company-service.service';
import { CompanyServiceRequest } from '@app/modules/company-service/dtos/company-service.request';

@Injectable()
export class CreateCompany {
  constructor(
    private readonly repository: CompanyRepository,
    private readonly mapping: CompanyMapping,
    private readonly companyServiceService: CompanyServiceService,
  ) { }

  async execute(request: CompanyRequest): Promise<CompanyResponse> {
    const data = this.mapping.create(request);

    const model = await this.repository.create(data);

    await this.createCompanyService(model.uuid, request.serviceId, request.key);

    return this.mapping.response(model);
  }

  private async createCompanyService(companyId: string, serviceId: string, key: string) {
    const req: CompanyServiceRequest = {
      key,
      companyId,
      serviceId,
      status: 'ACTIVE',
    }

    await this.companyServiceService.create(req);
  }
}