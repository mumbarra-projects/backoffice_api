import { Module } from '@nestjs/common';
import { ServiceService } from './company.service';
import { ServiceController } from './service.controller';
import { ServiceRepository } from './service.repostiory';
import { CreateService } from './useCases/create.service';
import { DeleteService } from './useCases/delete.service';
import { FindAllService } from './useCases/find-all.service';
import { FindByIdService } from './useCases/find-by-id.service';
import { UpdateService } from './useCases/update.service';

@Module({
  controllers: [
    ServiceController
  ],
  providers: [
    ServiceController,
    ServiceService,
    {
      provide: 'SERVICE_INTERFACE',
      useFactory: (ServiceService: ServiceService) => ServiceService,
      inject: [ServiceService]
    },
    ServiceRepository,
    FindAllService,
    FindByIdService,
    CreateService,
    UpdateService,
    DeleteService,
  ],
  exports: [
    ServiceService,
  ]
})
export class ServiceModule { }