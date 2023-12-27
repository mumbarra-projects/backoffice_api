import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CompanyRepository } from './company.repostiory';
import { FindAllCompany } from './useCases/find-all-company';

@Module({
  controllers: [
    CompanyController
  ],
  providers: [
    CompanyService,
    CompanyRepository,
    FindAllCompany
  ],
  exports: [
    CompanyService
  ]
})
export class CompanyModule { }