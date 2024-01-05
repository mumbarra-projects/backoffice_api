import { CompanyResponse } from './dtos/company.response';
import { CompanyRequest } from './dtos/company.request';
import { CompanyListResponse } from './dtos/company-list.response';

export interface ICompanyService {
  findAll(page?: number, quantity?: number): Promise<CompanyListResponse>;
  findByUuid(uuid: string): Promise<CompanyResponse>;
  create(request: CompanyRequest): Promise<CompanyResponse>;
  update(request: CompanyRequest, uuid: string): Promise<CompanyResponse>;
  delete(uuid: string): Promise<void>;
}