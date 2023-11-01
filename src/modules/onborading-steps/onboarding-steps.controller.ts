import {
    Body,
    Controller,
    Get,
    Post,
    UploadedFiles,
    UseInterceptors,
  } from "@nestjs/common";
import { OnboardingStepsService } from "./services/onboarding-steps.service";
import { CreateStepDto } from "./dtos/CreateStepDto";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { CreateSignDocumentStepDto } from "./dtos/CreateSignedDocumentStepDto";
  
  @Controller("onboarding-step")
  export class OnboardingStepController {
    constructor(
      private readonly onboardingStepService: OnboardingStepsService
    ) {}
  
    @Post("/")
    async createStep(@Body() dto: CreateStepDto) {
      const res = await this.onboardingStepService.createStep(dto);
      return res;
    }

    @Post("/sign")
    @UseInterceptors(FilesInterceptor('docs'))
    async createSignDocumentStep(
        @UploadedFiles() docs: Express.Multer.File[],
        @Body() dto: CreateSignDocumentStepDto
        ) {
      const res = await this.onboardingStepService.createSignDocumentStep(docs, dto);
      return res;
    }

    @Get("/")
    async getAllSteps() {
      const res = await this.onboardingStepService.getAllSteps();
      return res;
    }

  }
  