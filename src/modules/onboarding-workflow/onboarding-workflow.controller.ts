import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AddWorkFlowDto } from './dtos/AddWorkFlowDto';
import { OnboardingWorkflowService } from './services/onboarding-workflow.service';
import { AddStepWorkFlowDto } from './dtos/AddStepToWorkFlowDto';
import { AssignWorkflowToEmployeeDto } from './dtos/AssignWorkflowToUser';
import { EmployeeAuthMiddleware } from '../users/middleware/employee-auth.middleware';
@Controller('onboarding-workflow')
export class OnboardingWorkflowController {
  constructor(
    private readonly onboardingWorkflowService: OnboardingWorkflowService,
  ) {}

  @Post('/')
  async createContractDocument(@Body() dto: AddWorkFlowDto) {
    const res = await this.onboardingWorkflowService.createWorkflow(dto);
    return res;
  }

  @Get('/')
  async getAllWorflows() {
    const res = await this.onboardingWorkflowService.getAllWorkflows();
    return res;
  }

  @Get('/:id')
  async getWorkflowById(@Param('id') id: string) {
    const res = await this.onboardingWorkflowService.getWorkflowById(id);
    return res;
  }

  @UseGuards(EmployeeAuthMiddleware)
  @Post('assign')
  async assignWorkflowToEmployee(@Body() dto: AssignWorkflowToEmployeeDto) {
    const res = await this.onboardingWorkflowService.assignWorkflowToEmployee(
      dto.workflowId,
      dto.employeeId,
    );
    return res;
  }

  @Post('/add-step/:workflowId')
  async addStepToWorkflow(
    @Body() dto: AddStepWorkFlowDto,
    @Param('workflowId') workflowId: string,
  ) {
    const res = await this.onboardingWorkflowService.addStepToWorkflow(
      workflowId,
      dto,
    );
    return res;
  }
}
