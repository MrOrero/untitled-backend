import { Module } from '@nestjs/common';
import { OnboardingStepsService } from './services/onboarding-steps.service';
import { OnboardingStepsRepo } from './repository/onboarding-steps.repository';
import { OnboardingStepController } from './onboarding-steps.controller';
import { InjectionTokens } from 'src/libs/common/types/enum';

@Module({
  controllers: [OnboardingStepController],
  providers: [
    OnboardingStepsService,
    {
      provide: InjectionTokens.OnboardingStepsRepo, 
      useClass: OnboardingStepsRepo,
    },
  ],
})
export class OnboardingStepsModule {}
