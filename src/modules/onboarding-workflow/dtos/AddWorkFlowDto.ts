import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { OnboardingStepInfo } from '../model/onboarding-workflow.model';

export class AddWorkFlowDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  overview: string;

  @IsArray()
  steps: OnboardingStepInfo[];


}
