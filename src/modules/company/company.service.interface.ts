import { CompanyResponse } from './dtos/company.response';
import { CompanyRequest } from './dtos/company.request';

export interface ICompanyService {
  findAll(): Promise<CompanyResponse[]>;
  findById(uuid: string): Promise<CompanyResponse>;
  create(request: CompanyRequest): Promise<CompanyResponse>;
  update(request: CompanyRequest, uuid: string): Promise<CompanyResponse>;
  delete(uuid: string): Promise<void>;
}