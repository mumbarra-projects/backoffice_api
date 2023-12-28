import { ServiceRequest } from './dtos/service.request';
import { ServiceResponse } from './dtos/service.response';

export interface IServiceService {
  findAll(): Promise<ServiceResponse[]>;
  findById(uuid: string): Promise<ServiceResponse>;
  create(request: ServiceRequest): Promise<ServiceResponse>;
  update(request: ServiceRequest, uuid: string): Promise<ServiceResponse>;
  delete(uuid: string): Promise<void>;
}