import { Injectable, NotFoundException } from '@nestjs/common';
import { ServiceRepository } from '../service.repostiory';
import { ServiceResponse } from '../dtos/service.response';
import { ServiceModel } from '../dtos/service.model';

@Injectable()
export class FindByIdService {
  constructor(
    private readonly repository: ServiceRepository,
  ) { }

  async execute(uuid: string): Promise<ServiceResponse> {
    const model = await this.repository.findById(uuid);

    if (!model) {
      throw new NotFoundException('Service not found');
    }
    return this.getMapResponse(model);
  }

  private getMapResponse(model: ServiceModel): ServiceResponse {
    return {
      uuid: model.uuid,
      name: model.name,
      description: model.description,
      level: model.level,
      plan: model.plan,
      status: model.status,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt
    };
  }
}