import { Module, forwardRef } from '@nestjs/common';
import { CompanyServiceController } from './company-service.controller';
import { CompanyServiceService } from './company-service.service';
import { CompanyServiceMapping } from './company-service.mapping';
import { CompanyServiceRepository } from './company-service.repository';
import { CompanyModule } from '../company/company.module';
import { ServiceModule } from '../service/service.module';
import { CreateCompanyService } from './useCases/create.company-service';
import { DeleteCompanyService } from './useCases/delete.company-service';
import { FindAllCompanyService } from './useCases/find-all-company-service';
import { FindByIdCompanyService } from './useCases/find-company-service-by-id';
import { UpdateCompanyService } from './useCases/update.company-service';

@Module({
  controllers: [
    CompanyServiceController
  ],
  imports: [
    forwardRef(() => CompanyModule),
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
    FindAllCompanyService,
    FindByIdCompanyService,
    CreateCompanyService,
    UpdateCompanyService,
    DeleteCompanyService
  ],
  exports: [
    CompanyServiceService,
    CompanyServiceMapping
  ]
})
export class CompanyServiceModule { }