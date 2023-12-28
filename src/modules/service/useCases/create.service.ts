import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { ServiceRepository } from '../service.repostiory';
import { ServiceRequest } from '../dtos/service.request';
import { ServiceModel } from '../dtos/service.model';
import { ServiceResponse } from '../dtos/service.response';

@Injectable()
export class CreateService {
  constructor(
    private readonly repository: ServiceRepository,
  ) { }

  async execute(request: ServiceRequest): Promise<ServiceResponse> {

    const data: ServiceModel = {
      uuid: `SVC-${uuid()}`,
      name: request.name,
      description: request.description,
      level: request.level,
      plan: request.plan,
      status: request.status ? request.status : 'INACTIVE',
    }

    const model = await this.repository.create(data);
    return this.getMapResponse(model);
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