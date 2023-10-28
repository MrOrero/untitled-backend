import { BaseAggregateRoot } from 'src/libs/domain/BaseAggregateRoot';
import { Guard } from 'src/libs/domain/logic/Guard';
import { Result } from 'src/libs/domain/logic/Result';
import { CreateStepDto } from '../dtos/CreateStepDto';
import { Schema } from 'mongoose';

export interface OnboardingStepsProps {
  type: string;
  data: Schema.Types.ObjectId;
}

export class OnboardingStepsDomain extends BaseAggregateRoot<OnboardingStepsProps> {
  private constructor(props: OnboardingStepsProps) {
    super(props);
  }
 
  get id(): string {
    return this._id.toString();
  }

  get type(): string {
    return this.props.type;
  }

  get data(): any {
    return this.props.data;
  }

  public static create(
    props: OnboardingStepsProps,
  ): Result<OnboardingStepsDomain> {
    const guardResult = Guard.validate<CreateStepDto, OnboardingStepsProps>(
      CreateStepDto,
      props,
    );

    if (guardResult) {
      return Result.fail<OnboardingStepsDomain>(guardResult.errMsg);
    }
    const onboardingWorkflow = new OnboardingStepsDomain({
      ...props,
    });

    return Result.ok<OnboardingStepsDomain>(onboardingWorkflow);
  }
}
