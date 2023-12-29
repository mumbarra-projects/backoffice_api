import { Module } from '@nestjs/common';
import { CreateService } from './useCases/create.service';
import { DeleteService } from './useCases/delete.service';
import { FindAllService } from './useCases/find-all.service';
import { FindByIdService } from './useCases/find-by-id.service';
import { UpdateService } from './useCases/update.service';
import { CompanyServiceController } from './company-service.controller';
import { CompanyServiceService } from './company-service.service';
import { CompanyServiceMapping } from './company-service.mapping';
import { CompanyServiceRepository } from './company-service.repository';
import { CompanyModule } from '../company/company.module';
import { ServiceModule } from '../service/service.module';

@Module({
  controllers: [
    CompanyServiceController
  ],
  imports: [
    CompanyModule,
    ServiceModule
  ],
  providers: [
    CompanyServiceController,
    CompanyServiceService,
    {
      provide: 'COMPANY_SERVICE_INTERFACE',
      useFactory: (companyServiceService: CompanyServiceService) => companyServiceService,
      inject: [CompanyServiceService]
    },
    CompanyServiceRepository,
    CompanyServiceMapping,
    FindAllService,
    FindByIdService,
    CreateService,
    UpdateService,
    DeleteService
  ],
  exports: [
    CompanyServiceService,
    CompanyServiceMapping
  ]
})
export class CompanyServiceModule { }