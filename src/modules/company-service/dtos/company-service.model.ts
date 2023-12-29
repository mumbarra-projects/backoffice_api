import { companyServiceStatus } from '@prisma/client';

export class CompanyServiceModel {
  id?: bigint;
  uuid: string;
  apikey: string;
  companyId: bigint;
  serviceId: bigint;
  status: companyServiceStatus;
  createdAt?: Date;
  updatedAt?: Date;
}