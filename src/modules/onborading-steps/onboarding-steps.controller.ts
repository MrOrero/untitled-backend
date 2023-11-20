import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
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

    @Put("/:id")
    async updateStep(@Body() dto: CreateStepDto, @Param('id') id: string) {
      const res = await this.onboardingStepService.updateStep(id, dto);
      return res;
    }

    @Delete('/:id')
    async deleteStep(@Param('id') id: string){
      const res = await this.onboardingStepService.deleteStep(id)
      return res
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

    @Put("/assign/:id")
    async updateAssignedStep(@Body() dto: CreateStepDto, @Param('id') id: string) {
      const res = await this.onboardingStepService.updateAssignedStep(id, dto);
      return res;
    }

    @Get("/")
    async getAllSteps() {
      const res = await this.onboardingStepService.getAllSteps();
      return res;
    }

  }
  