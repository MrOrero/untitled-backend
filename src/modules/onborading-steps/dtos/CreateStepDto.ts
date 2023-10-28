import { IsEnum } from 'class-validator';
import { IsValidDataForType } from 'src/libs/common/decorators/validation.decorator';
import { StepTypes } from 'src/libs/common/types/enum';

export class CreateStepDto {
  @IsEnum(StepTypes, {
    message: `type must be a valid enum value: ${Object.values(StepTypes)}`,
  })
  type: StepTypes;

  @IsValidDataForType({
    message: 'Invalid data structure for the provided type',
  })
  data: any;
}
