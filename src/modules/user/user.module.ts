import { Module } from '@nestjs/common';
import { CompanyModule } from '../company/company.module';
import { UserController } from './user.controller';
import { UserMapping } from './user.mapping';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { CreateUser } from './useCases/create.user';
import { DeleteUser } from './useCases/delete.user';
import { FindAllUser } from './useCases/find-all-user';
import { FindByIdUser } from './useCases/find-user-by-id';
import { UpdateUser } from './useCases/update.user';

@Module({
  controllers: [
    UserController
  ],
  imports: [
    CompanyModule,
  ],
  providers: [
    UserController,
    UserService,
    {
      provide: 'USER_INTERFACE',
      useFactory: (UserService: UserService) => UserService,
      inject: [UserService]
    },
    UserRepository,
    UserMapping,
    FindAllUser,
    FindByIdUser,
    CreateUser,
    UpdateUser,
    DeleteUser
  ],
  exports: [
    UserService,
    UserMapping,
    UserRepository
  ]
})
export class UserModule { }