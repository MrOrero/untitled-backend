import { IsArray } from "class-validator";

export class SubmitWorkFlowDto {
  @IsArray()
  steps: any[];
}
