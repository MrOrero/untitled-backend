import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Query,
    UploadedFile,
    UseInterceptors,
  } from "@nestjs/common";
import { OnboardingStepsService } from "./services/onboarding-steps.service";
import { CreateStepDto } from "./dtos/CreateStepDto";
  
  @Controller("onboarding-step")
  export class OnboardingStepController {
    constructor(
      private readonly onboardingStepService: OnboardingStepsService
    ) {}
  
    @Post("/")
    async createContractDocument(@Body() dto: CreateStepDto) {
      const res = await this.onboardingStepService.createStep(dto);
      return res;
    }

    @Get("/")
    async getAllSteps() {
      const res = await this.onboardingStepService.getAllSteps();
      return res;
    }

  }
  