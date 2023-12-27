import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CompanyRepository } from './company.repostiory';
import { FindByIdCompany } from './useCases/find-by-id.company';
import { FindAllCompany } from './useCases/find-all.company';
import { CreateCompany } from './useCases/create.company';

@Module({
  controllers: [
    CompanyController
  ],
  providers: [
    CompanyService,
    CompanyRepository,
    FindAllCompany,
    FindByIdCompany,
    CreateCompany
  ],
  exports: [
    CompanyService
  ]
})
export class CompanyModule { }