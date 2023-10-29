import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './libs/db/DatabaseModule';
import { OnboardingWorkflowModule } from './modules/onboarding-workflow/onboarding-workflow.module';
import { OnboardingStepsModule } from './modules/onborading-steps/onboarding-steps.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/auth.service';
import { CompanyService } from './modules/users/services/company.service';
import { EmployeeService } from './modules/users/services/employee.service';
import { EmployeeRepo } from './modules/users/repository/employee.repository';
import { CompanyRepo } from './modules/users/repository/company.repository';

@Module({
  imports: [
    DatabaseModule,
    OnboardingWorkflowModule,
    OnboardingStepsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthService,
    CompanyService,
    EmployeeService,
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
export class AppModule {}
