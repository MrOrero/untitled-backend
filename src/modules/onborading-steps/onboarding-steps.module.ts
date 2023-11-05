import { Module } from '@nestjs/common';
import { OnboardingStepsService } from './services/onboarding-steps.service';
import { OnboardingStepsRepo } from './repository/onboarding-steps.repository';
import { OnboardingStepController } from './onboarding-steps.controller';
import { InjectionTokens } from 'src/libs/common/types/enum';
import { UploadDocumentRepo } from '../steps-configuration/repository/upload-document.repository';
import { SignedDocumentRepo } from '../steps-configuration/repository/signed-document.repository';
import { CheckListRepo } from '../steps-configuration/repository/checklist.repository';
import { AssignedStepsRepo } from './repository/assigned-steps.repository';

const infrastructure = [
  {
    provide: InjectionTokens.OnboardingStepsRepo,
    useClass: OnboardingStepsRepo,
  },
  {
    provide: InjectionTokens.UploadDocumentRepo,
    useClass: UploadDocumentRepo,
  },
  {
    provide: InjectionTokens.SignDocumentRepo,
    useClass: SignedDocumentRepo
  },
  {
    provide: InjectionTokens.CheckListRepo,
    useClass: CheckListRepo
  },
  {
    provide: InjectionTokens.AssignedStepsRepo,
    useClass: AssignedStepsRepo
  }
];

@Module({
  controllers: [OnboardingStepController],
  providers: [OnboardingStepsService, ...infrastructure],
    exports: [OnboardingStepsService, ...infrastructure]
})
export class OnboardingStepsModule {}
