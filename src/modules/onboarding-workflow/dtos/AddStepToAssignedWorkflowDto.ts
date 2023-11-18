import { IsArray, IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { OnboardingStepInfo } from '../model/onboarding-workflow.model';

export class AddStepToAssignedWorkFlowDto {
  @IsNumberString()
  order: string;

  @IsString()
  stepId: string;
}
