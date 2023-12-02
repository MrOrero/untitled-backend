import { IsArray, IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { OnboardingStepInfo } from '../model/onboarding-workflow.model';

export class AddStepWorkFlowDto {
  @IsNumberString()
  order: string;

  @IsString()
  stepId: OnboardingStepInfo[];


}
