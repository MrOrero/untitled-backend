import {
    Body,
    Controller,
    Get,
    Post,
  } from "@nestjs/common";
import { AddWorkFlowDto } from "./dtos/AddWorkFlowDto";
import { OnboardingWorkflowService } from "./services/onboarding-workflow.service";
  
  @Controller("onboarding-workflow")
  export class OnboardingWorkflowController {
    constructor(
      private readonly onboardingWorkflowService: OnboardingWorkflowService
    ) {}
  
    @Post("/")
    async createContractDocument(@Body() dto: AddWorkFlowDto) {
      const res = await this.onboardingWorkflowService.createWorkflow(dto);
      return res;
    }

    @Get("/")
    async getAllWorflows() {
      const res = await this.onboardingWorkflowService.getAllWorkflows();
      return res;
    }

  }
  