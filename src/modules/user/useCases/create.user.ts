import { CompanyRepository } from '@app/modules/company/company.repository';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
    await this.validateExist(request);
    
    const company = await this.companyRepository.findByUuid(request.companyId);

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    const data = await this.mapping.create(request, company.id);

    const model = await this.repository.create(data);
    return this.mapping.response(model);
  }

  private async validateExist(request: UserRequest) {
    const existUsername = await this.repository.existByUsername(request.username);

    if (existUsername) {
      throw new BadRequestException('User with this username already exists');
    }

    const existByDocument = await this.repository.existByDocument(request.document);

    if (existByDocument) {
      throw new BadRequestException('User with this document already exists');
    }

    if (request.email) {
      const existByEmail = await this.repository.existByEmail(request.email);

      if (existByEmail) {
        throw new BadRequestException('User with this email already exists');
      }
    }
  }
}