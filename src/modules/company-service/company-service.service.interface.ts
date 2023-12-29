import { CompanyServiceRequest } from './dtos/company-service.request';
import { CompanyServiceResponse } from './dtos/company-service.response';

export interface ICompanyServiceService {
  findAll(): Promise<CompanyServiceResponse[]>;
  findByUuid(uuid: string): Promise<CompanyServiceResponse>;
  create(request: CompanyServiceRequest): Promise<CompanyServiceResponse>;
  update(request: CompanyServiceRequest, uuid: string): Promise<CompanyServiceResponse>;
  delete(uuid: string): Promise<void>;
}