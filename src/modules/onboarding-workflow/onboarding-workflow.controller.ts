import { Body, Controller, Delete, Get, Param, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AddWorkFlowDto } from './dtos/AddWorkFlowDto';
import { OnboardingWorkflowService } from './services/onboarding-workflow.service';
import { AddStepWorkFlowDto } from './dtos/AddStepToWorkFlowDto';
import { AssignWorkflowToEmployeeDto } from './dtos/AssignWorkflowToUser';
import { EmployeeAuthMiddleware } from '../users/middleware/employee-auth.middleware';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateSignDocumentStepDto } from '../onborading-steps/dtos/CreateSignedDocumentStepDto';
import { AddStepToAssignedWorkFlowDto } from './dtos/AddStepToAssignedWorkflowDto';
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

  @Delete('/:id')
  async deleteWorkflow(@Param('id') id: string) {
    const res = await this.onboardingWorkflowService.deleteWorkflow(id)
    return res
  }

  @Post('assign')
  async assignWorkflowToEmployee(@Body() dto: AssignWorkflowToEmployeeDto) {
    const res = await this.onboardingWorkflowService.assignWorkflowToEmployee(
      dto.workflowId,
      dto.employeeId,
    );
    return res;
  }

  @Get('/assign/:employeeId')
  async getAssignedWorkflows(@Param('employeeId') employeeId: string) {
    const res =
      await this.onboardingWorkflowService.getAssignedWorkflowById(employeeId);
    return res;
  }

  @Post('/submit-step/:workflowId/:stepId')
  @UseInterceptors(FilesInterceptor('docs'))
  async submitWorkflowStep(
    @UploadedFiles() docs: Express.Multer.File[],
    @Param('workflowId') workflowId: string,
    @Param('stepId') stepId: string,
    @Body() dto: any
  ) {
    const res = await this.onboardingWorkflowService.submitStep(
      workflowId,
      stepId,
      docs,
      dto,
    );
    return res;
  }

  @Post('/assign/add-step/:workflowId')
  async addStepToAssignedWorkflow(
    @Body() dto: AddStepToAssignedWorkFlowDto,
    @Param('workflowId') workflowId: string,
  ) {
    const res = await this.onboardingWorkflowService.addStepToAssignedWorkflow(
      workflowId,
      dto,
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
