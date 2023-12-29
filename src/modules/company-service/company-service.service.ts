import { Injectable } from '@nestjs/common';
import { CreateService } from './useCases/create.service';
import { DeleteService } from './useCases/delete.service';
import { FindAllService } from './useCases/find-all.service';
import { FindByIdService } from './useCases/find-by-id.service';
import { UpdateService } from './useCases/update.service';
import { ICompanyServiceService } from './company-service.service.interface';
import { CompanyServiceRequest } from './dtos/company-service.request';
import { CompanyServiceResponse } from './dtos/company-service.response';

@Injectable()
export class CompanyServiceService implements ICompanyServiceService {
  constructor(
    private readonly findAllService: FindAllService,
    private readonly findByIdService: FindByIdService,
    private readonly createService: CreateService,
    private readonly updateService: UpdateService,
    private readonly deleteService: DeleteService,
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