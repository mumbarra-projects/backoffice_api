import { Injectable, NotFoundException } from '@nestjs/common';
import { ServiceModel } from '../dtos/service.model';
import { ServiceRequest } from '../dtos/service.request';
import { ServiceResponse } from '../dtos/service.response';
import { ServiceRepository } from '../service.repostiory';

@Injectable()
export class UpdateService {
  constructor(
    private readonly repository: ServiceRepository,
  ) { }

  async execute(request: ServiceRequest, uuid: string): Promise<ServiceResponse> {

    const model = await this.repository.findById(uuid);

    if (!model) {
      throw new NotFoundException('Service not found');
    }

    const data = this.getMapModel(model, request);

    const result = await this.repository.update(data, uuid);
    return this.getMapResponse(result);
  }

  private getMapModel(model: ServiceModel, request: ServiceRequest): ServiceModel {
    model.name = request.name ?? model.name;
    model.description = request.description ?? model.description;
    model.level = request.level ?? model.level;
    model.plan = request.plan ?? model.plan;
    model.status = request.status ?? model.status;
    model.updatedAt = new Date();
    return model;
  }

  private getMapResponse(model: ServiceModel): ServiceResponse {
    return ({
      uuid: model.uuid,
      name: model.name,
      description: model.description,
      level: model.level,
      plan: model.plan,
      status: model.status,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt
    });
  }
}