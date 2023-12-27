import { companyStatus } from '@prisma/client';

export class CompanyModel {
  id: bigint;
  uuid: string;
  name: string;
  businessName: string;
  document: string;
  address?: string;
  zipCode?: string;
  phone?: string;
  email: string;
  status: companyStatus;
  createdAt: Date;
  updatedAt?: Date;
}