import { Injectable, NotFoundException } from '@nestjs/common';
import { CompanyRepository } from '../company.repository';

@Injectable()
export class DeleteCompany {
  constructor(
    private readonly repository: CompanyRepository,
  ) { }

  async execute(uuid: string): Promise<void> {
    const model = await this.repository.findByUuid(uuid);

    if (!model) {
      throw new NotFoundException('Company not found');
    }

    this.repository.delete(uuid);
  }
}