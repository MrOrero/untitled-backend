import {
    IsString,
    IsNotEmpty,
  } from "class-validator";
import { Schema } from "mongoose";
import { BaseAggregateRoot } from "src/libs/domain/BaseAggregateRoot";
  import { Guard } from "src/libs/domain/logic/Guard";
  import { Result } from "src/libs/domain/logic/Result";
import { AddWorkFlowDto } from "../dtos/AddWorkFlowDto";
import { OnboardingStepInfo } from "../model/onboarding-workflow.model";
  
  export interface OnboardingWorkflowProps {
    title: string;
    overview: string;
    steps: OnboardingStepInfo[];
  }
  
  export class OnboardingWorkflowDomain extends BaseAggregateRoot<OnboardingWorkflowProps> {
    private constructor(props: OnboardingWorkflowProps) {
      super(props);
    }
  
    get id(): string {
      return this._id.toString();
    }
  
    get title(): string {
      return this.props.title;
    }
  
    get overview(): string {
      return this.props.overview;
    }

    get steps(): any {
        return this.props.steps;
    }
  
    public static create(
      props: OnboardingWorkflowProps,
    ): Result<OnboardingWorkflowDomain> {
      const guardResult = Guard.validate<
        AddWorkFlowDto,
        OnboardingWorkflowProps
      >(AddWorkFlowDto, props);
  
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
  