import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './libs/db/DatabaseModule';
import { OnboardingWorkflowModule } from './modules/onboarding-workflow/onboarding-workflow.module';

@Module({
  imports: [DatabaseModule, OnboardingWorkflowModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
