import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { ServiceModel } from './dtos/service.model';
import { ServiceRequest } from './dtos/service.request';
import { ServiceResponse } from './dtos/service.response';

@Injectable()
export class ServiceMapping {
  constructor() { }

  create(request: ServiceRequest): ServiceModel {
    const data: ServiceModel = {
      uuid: `SVC-${uuid()}`,
      name: request.name,
      description: request.description,
      level: request.level,
      plan: request.plan,
      status: request.status ? request.status : 'INACTIVE',
    }

    return data;
  }

  update(model: ServiceModel, request: ServiceRequest): ServiceModel {
    model.name = request.name ?? model.name;
    model.description = request.description ?? model.description;
    model.level = request.level ?? model.level;
    model.plan = request.plan ?? model.plan;
    model.status = request.status ?? model.status;
    model.updatedAt = new Date();
    return model;
  }

  response(model: ServiceModel): ServiceResponse {
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

  responseList(models: ServiceModel[]): ServiceResponse[] {
    return models.map((model: ServiceModel) => this.response(model));
  }
}