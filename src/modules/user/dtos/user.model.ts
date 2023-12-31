import { userAccessLevel, userStatus } from '@prisma/client';

export class UserModel {
  id?: bigint;
  uuid: string;
  name: string;
  document: string;
  username: string;
  email?: string;
  password: string;
  status: userStatus;
  accessLevel: userAccessLevel;
  companyId: bigint;
  createdAt?: Date;
  updatedAt?: Date;
}