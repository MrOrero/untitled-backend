import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './libs/db/DatabaseModule';
import { OnboardingWorkflowModule } from './modules/onboarding-workflow/onboarding-workflow.module';
import { OnboardingStepsModule } from './modules/onborading-steps/onboarding-steps.module';

@Module({
  imports: [DatabaseModule, OnboardingWorkflowModule, OnboardingStepsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
