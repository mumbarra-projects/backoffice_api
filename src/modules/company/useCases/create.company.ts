import { BadRequestException, Injectable } from '@nestjs/common';
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
    await this.validateExist(request);
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

  private async validateExist(request: CompanyRequest) {
    const existByDocument = await this.repository.existByDocument(request.document);

    if (existByDocument) {
      throw new BadRequestException('Company with this document already exists');
    }

    if (request.email) {
      const existByEmail = await this.repository.existByEmail(request.email);

      if (existByEmail) {
        throw new BadRequestException('Company with this email already exists');
      }
    }
  }
}