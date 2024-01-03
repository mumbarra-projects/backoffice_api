import { CompanyRepository } from '@app/modules/company/company.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRequest } from '../dtos/user.request';
import { UserResponse } from '../dtos/user.response';
import { UserRepository } from '../user.repository';
import { UserMapping } from '../user.mapping';

@Injectable()
export class CreateUser {
  constructor(
    private readonly repository: UserRepository,
    private readonly mapping: UserMapping,
    private readonly companyRepository: CompanyRepository,
  ) { }

  async execute(request: UserRequest): Promise<UserResponse> {

    const company = await this.companyRepository.findByUuid(request.companyId);

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    const data = await this.mapping.create(request, company.id);

    const model = await this.repository.create(data);
    return this.mapping.response(model);
  }
}