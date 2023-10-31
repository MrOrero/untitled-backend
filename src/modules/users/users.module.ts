import { Module } from '@nestjs/common';
import { EmployeeRepo } from './repository/employee.repository';
import { EmployeeService } from './services/employee.service';
import { EmployeeController } from './controller/employee.controller';
import { CompanyRepo } from './repository/company.repository';
import { CompanyService } from './services/company.service';
import { CompanyController } from './controller/company.controller';
import { EmployeeUploadController } from './controller/employee-upload.controller';
import { EmployeeUploadService } from './services/employee-upload.service';

@Module({
  controllers: [
    CompanyController,
    EmployeeController,
    EmployeeUploadController,
  ],
  providers: [
    CompanyService,
    EmployeeService,
    EmployeeUploadService,
    {
      provide: 'EmployeeRepo',
      useClass: EmployeeRepo,
    },
    {
      provide: 'CompanyRepo',
      useClass: CompanyRepo,
    },
  ],
  exports: [CompanyService, EmployeeService, EmployeeUploadService],
})
export class UsersModule {}
