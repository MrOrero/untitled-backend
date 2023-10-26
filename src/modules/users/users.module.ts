import { Module } from '@nestjs/common';
import { EmployeeRepo } from './repository/employee.repository';
import { EmployeeService } from './services/employee.service';
import { EmployeeController } from './controller/employee.controller';
import { CompanyRepo } from './repository/company.repository';
import { CompanyService } from './services/company.service';
import { CompanyController } from './controller/company.controller';

@Module({
  controllers: [EmployeeController, CompanyController],
  providers: [
    EmployeeService,
    CompanyService,
    {
      provide: 'EmployeeRepo',
      useClass: EmployeeRepo,
    },
    {
      provide: 'CompanyRepo',
      useClass: CompanyRepo,
    },
  ],
})
export class UsersModule {}
