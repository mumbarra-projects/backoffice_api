import { Injectable } from '@nestjs/common';
import { IServiceService } from './service.service.interface';
import { ServiceRequest } from './dtos/service.request';
import { ServiceResponse } from './dtos/service.response';
import { CreateService } from './useCases/create.service';
import { DeleteService } from './useCases/delete.service';
import { FindAllService } from './useCases/find-all.service';
import { FindByIdService } from './useCases/find-by-id.service';
import { UpdateService } from './useCases/update.service';

@Injectable()
export class ServiceService implements IServiceService {
  constructor(
    private readonly findAllService: FindAllService,
    private readonly findByIdService: FindByIdService,
    private readonly createService: CreateService,
    private readonly updateService: UpdateService,
    private readonly deleteService: DeleteService,
  ) { }

  async findAll(): Promise<ServiceResponse[]> {
    return this.findAllService.execute();
  }

  async findById(uuid: string): Promise<ServiceResponse> {
    return this.findByIdService.execute(uuid);
  }

  async create(request: ServiceRequest): Promise<ServiceResponse> {
    return this.createService.execute(request);
  }

  async update(request: ServiceRequest, uuid: string): Promise<ServiceResponse> {
    return this.updateService.execute(request, uuid);
  }

  async delete(uuid: string): Promise<void> {
    await this.deleteService.execute(uuid);
  }
}