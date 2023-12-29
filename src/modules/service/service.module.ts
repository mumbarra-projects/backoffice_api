import { Module } from '@nestjs/common';
import { ServiceController } from './service.controller';
import { CreateService } from './useCases/create.service';
import { DeleteService } from './useCases/delete.service';
import { FindAllService } from './useCases/find-all.service';
import { FindByIdService } from './useCases/find-by-id.service';
import { UpdateService } from './useCases/update.service';
import { ServiceService } from './service.service';
import { ServiceMapping } from './service.mapping';
import { ServiceRepository } from './service.repository';

@Module({
  controllers: [
    ServiceController
  ],
  providers: [
    ServiceController,
    ServiceService,
    {
      provide: 'SERVICE_INTERFACE',
      useFactory: (serviceService: ServiceService) => serviceService,
      inject: [ServiceService]
    },
    ServiceRepository,
    ServiceMapping,
    FindAllService,
    FindByIdService,
    CreateService,
    UpdateService,
    DeleteService,
  ],
  exports: [
    ServiceService,
    ServiceMapping,
    ServiceRepository
  ]
})
export class ServiceModule { }