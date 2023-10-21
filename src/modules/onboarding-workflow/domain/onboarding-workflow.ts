import {
    IsString,
    IsNotEmpty,
  } from "class-validator";
import { BaseAggregateRoot } from "src/libs/domain/BaseAggregateRoot";
  import { Guard } from "src/libs/domain/logic/Guard";
  import { Result } from "src/libs/domain/logic/Result";
  
  export interface OnboardingWorkflowProps {
    title: string;
    overview: string;
  }
  
  export class OnboardingWorkflowValidation {
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @IsString()
    @IsNotEmpty()
    overview: string;
  }
  
  export class OnboardingWorkflowDomain extends BaseAggregateRoot<OnboardingWorkflowProps> {
    private constructor(props: OnboardingWorkflowProps) {
      super(props);
    }
  
    get id(): string {
      return this._id.toString();
    }
  
    get title(): string {
      return this.props.title.replace(/[^a-zA-Z0-9\s]/g, "");
    }
  
    get overview(): string {
      return this.props.overview;
    }
  
    public static create(
      props: OnboardingWorkflowProps,
    ): Result<OnboardingWorkflowDomain> {
      const guardResult = Guard.validate<
        OnboardingWorkflowValidation,
        OnboardingWorkflowProps
      >(OnboardingWorkflowValidation, props);
  
      if (guardResult) {
        return Result.fail<OnboardingWorkflowDomain>(guardResult.errMsg);
      }
      const onboardingWorkflow = new OnboardingWorkflowDomain(
        {
          ...props,
        },
      );
  
      return Result.ok<OnboardingWorkflowDomain>(onboardingWorkflow);
    }
  }
  