import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CompanyRepository } from '../company.repository';
import { CompanyResponse } from '../dtos/company.response';
import { CompanyRequest } from '../dtos/company.request';
import { CompanyMapping } from '../company.mapping';
import { CompanyModel } from '../dtos/company.model';

@Injectable()
export class UpdateCompany {
  constructor(
    private readonly repository: CompanyRepository,
    private readonly mapping: CompanyMapping,
  ) { }

  async execute(request: CompanyRequest, uuid: string): Promise<CompanyResponse> {

    const model = await this.repository.findByUuid(uuid);

    if (!model) {
      throw new NotFoundException('Company not found');
    }

    await this.validateExist(request, model);

    const data = this.mapping.update(model, request);

    const result = await this.repository.update(data, uuid);
    return this.mapping.response(result);
  }

  private async validateExist(request: CompanyRequest, model: CompanyModel) {
    if (request.document !== model.document) {
      const existByDocument = await this.repository.existByDocument(request.document);

      if (existByDocument) {
        throw new BadRequestException('Company with this document already exists');
      }
    }

    if (request.email && request.email !== model.email) {
      const existByEmail = await this.repository.existByEmail(request.email);

      if (existByEmail) {
        throw new BadRequestException('Company with this email already exists');
      }
    }
  }
}