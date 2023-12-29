import { serviceLevel, servicePlan, serviceStatus } from '@prisma/client';

export class ServiceModel {
  id?: bigint;
  uuid: string;
  name: string;
  description?: string;
  level: serviceLevel;
  plan: servicePlan;
  status: serviceStatus;
  createdAt?: Date;
  updatedAt?: Date;
}