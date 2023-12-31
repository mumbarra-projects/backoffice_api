import { Injectable } from '@nestjs/common';
import { ICompanyServiceService } from './company-service.service.interface';
import { CompanyServiceRequest } from './dtos/company-service.request';
import { CompanyServiceResponse } from './dtos/company-service.response';
import { CreateCompanyService } from './useCases/create.company-service';
import { DeleteCompanyService } from './useCases/delete.company-service';
import { FindAllCompanyService } from './useCases/find-all-company-service';
import { FindByIdCompanyService } from './useCases/find-company-service-by-id';
import { UpdateCompanyService } from './useCases/update.company-service';

@Injectable()
export class CompanyServiceService implements ICompanyServiceService {
  constructor(
    private readonly findAllService: FindAllCompanyService,
    private readonly findByIdService: FindByIdCompanyService,
    private readonly createService: CreateCompanyService,
    private readonly updateService: UpdateCompanyService,
    private readonly deleteService: DeleteCompanyService,
  ) { }

  async findAll(): Promise<CompanyServiceResponse[]> {
    return this.findAllService.execute();
  }

  async findByUuid(uuid: string): Promise<CompanyServiceResponse> {
    return this.findByIdService.execute(uuid);
  }

  async create(request: CompanyServiceRequest): Promise<CompanyServiceResponse> {
    return this.createService.execute(request);
  }

  async update(request: CompanyServiceRequest, uuid: string): Promise<CompanyServiceResponse> {
    return this.updateService.execute(request, uuid);
  }

  async delete(uuid: string): Promise<void> {
    await this.deleteService.execute(uuid);
  }
}