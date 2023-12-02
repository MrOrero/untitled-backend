import { IsNotEmpty, IsString } from 'class-validator';

export class AssignWorkflowToEmployeeDto {
  @IsString()
  @IsNotEmpty()
  workflowId: string;

  @IsString()
  @IsNotEmpty()
  employeeId: string;
}
