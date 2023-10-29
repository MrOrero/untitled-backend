import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthService } from './auth.service';
import { CompanyService } from '../users/services/company.service';
import { EmployeeService } from '../users/services/employee.service';
import { EmployeeRepo } from '../users/repository/employee.repository';
import { CompanyRepo } from '../users/repository/company.repository';

@Module({
  imports: [PassportModule],
  providers: [
    AuthService,
    LocalStrategy,
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
  exports: [AuthService],
})
export class AuthModule {}
