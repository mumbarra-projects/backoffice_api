import { Injectable } from '@nestjs/common';
import { ServiceRepository } from '../service.repostiory';
import { ServiceResponse } from '../dtos/service.response';
import { ServiceModel } from '../dtos/service.model';

@Injectable()
export class FindAllService {
  constructor(
    private readonly repository: ServiceRepository,
  ) { }

  async execute(): Promise<ServiceResponse[]> {
    const models = await this.repository.find();
    return this.getMapResponse(models);
  }

  private getMapResponse(models: ServiceModel[]): ServiceResponse[] {
    return models.map((model: ServiceModel) => ({
      uuid: model.uuid,
      name: model.name,
      description: model.description,
      level: model.level,
      plan: model.plan,
      status: model.status,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt
    }));
  }
}