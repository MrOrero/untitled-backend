import { Module } from '@nestjs/common';
import { OnboardingWorkflowRepo } from './repository/onboarding-workflow.repository';
import { OnboardingWorkflowService } from './services/onboarding-workflow.service';
import { InjectionTokens } from 'src/libs/common/types/enum';
import { OnboardingWorkflowController } from './onboarding-workflow.controller';

@Module({
  controllers: [OnboardingWorkflowController],
  providers: [
    OnboardingWorkflowService,
    {
      provide: InjectionTokens.OnboardingWorkflowRepo, 
      useClass: OnboardingWorkflowRepo,
    },
  ],
})
export class OnboardingWorkflowModule {}