import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CompanyRepository } from './company.repository';
import { FindByIdCompany } from './useCases/find-by-id.company';
import { FindAllCompany } from './useCases/find-all.company';
import { CreateCompany } from './useCases/create.company';
import { UpdateCompany } from './useCases/update.company';
import { DeleteCompany } from './useCases/delete.company ';
import { CompanyMapping } from './company.mapping';
import { CompanyServiceModule } from '../company-service/company-service.module';

@Module({
  controllers: [
    CompanyController
  ],
  imports: [
    CompanyServiceModule
  ],
  providers: [
    CompanyService,
    {
      provide: 'COMPANY_INTERFACE',
      useFactory: (companyService: CompanyService) => companyService,
      inject: [CompanyService]
    },
    CompanyRepository,
    CompanyMapping,
    FindAllCompany,
    FindByIdCompany,
    CreateCompany,
    UpdateCompany,
    DeleteCompany,
  ],
  exports: [
    CompanyService,
    CompanyMapping,
    CompanyRepository
  ]
})
export class CompanyModule { }