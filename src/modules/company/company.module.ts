import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CompanyRepository } from './company.repostiory';
import { FindByIdCompany } from './useCases/find-by-id.company';
import { FindAllCompany } from './useCases/find-all.company';
import { CreateCompany } from './useCases/create.company';
import { UpdateCompany } from './useCases/update.company';
import { DeleteCompany } from './useCases/delete.company ';

@Module({
  controllers: [
    CompanyController
  ],
  providers: [
    CompanyService,
    {
      provide: 'COMPANY_INTERFACE',
      useFactory: (companyService: CompanyService) => companyService,
      inject: [CompanyService]
    },
    CompanyRepository,
    FindAllCompany,
    FindByIdCompany,
    CreateCompany,
    UpdateCompany,
    DeleteCompany,
  ],
  exports: [
    CompanyService,
  ]
})
export class CompanyModule { }