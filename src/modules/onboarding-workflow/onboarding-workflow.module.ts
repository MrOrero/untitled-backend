import { Module } from '@nestjs/common';
import { OnboardingWorkflowRepo } from './repository/onboarding-workflow.repository';
import { OnboardingWorkflowService } from './services/onboarding-workflow.service';
import { InjectionTokens } from 'src/libs/common/types/enum';
import { OnboardingWorkflowController } from './onboarding-workflow.controller';
import { UsersModule } from '../users/users.module';
import { OnboardingStepsService } from '../onborading-steps/services/onboarding-steps.service';
import { AssignedWorkflowRepo } from './repository/assigned-workflow.repository';
import { OnboardingStepsModule } from '../onborading-steps/onboarding-steps.module';

@Module({
  imports: [
    OnboardingStepsModule
  ],
  controllers: [OnboardingWorkflowController],
  providers: [
    OnboardingWorkflowService,
    {
      provide: InjectionTokens.OnboardingWorkflowRepo, 
      useClass: OnboardingWorkflowRepo,
    },
    {
      provide: InjectionTokens.AssignedWorkflowRepo, 
      useClass: AssignedWorkflowRepo,
    }
  ],
  exports: [OnboardingWorkflowService]
})
export class OnboardingWorkflowModule {}
