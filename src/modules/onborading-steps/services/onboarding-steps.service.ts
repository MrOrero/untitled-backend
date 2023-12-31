import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStepDto } from '../dtos/CreateStepDto';
import { OnboardingStepsRepo } from '../repository/onboarding-steps.repository';
import { InjectionTokens } from 'src/libs/common/types/enum';
import { UploadDocumentRepo } from 'src/modules/steps-configuration/repository/upload-document.repository';
import { SignedDocumentRepo } from 'src/modules/steps-configuration/repository/signed-document.repository';
import { FirebaseStorage } from 'src/libs/infra/firebase-storage/firebase-storage';
import { CreateSignDocumentStepDto } from '../dtos/CreateSignedDocumentStepDto';
import { CheckListRepo } from 'src/modules/steps-configuration/repository/checklist.repository';
import { AssignedStepsRepo } from '../repository/assigned-steps.repository';
import { OnboardingWorkflow } from 'src/modules/onboarding-workflow/model/onboarding-workflow.model';
import { Schema, Types } from 'mongoose';

@Injectable()
export class OnboardingStepsService {
  @Inject(InjectionTokens.UploadDocumentRepo)
  private readonly uploadDocumentRepo: UploadDocumentRepo;

  @Inject(InjectionTokens.SignDocumentRepo)
  private readonly signDocumentRepo: SignedDocumentRepo;

  @Inject(InjectionTokens.CheckListRepo)
  private readonly checkListRepo: CheckListRepo;

  @Inject(InjectionTokens.AssignedStepsRepo)
  private readonly assignedStepsRepo: AssignedStepsRepo;

  constructor(
    @Inject(InjectionTokens.OnboardingStepsRepo)
    private readonly onboardingStepsRepo: OnboardingStepsRepo,
  ) {}

  async createStep(dto: CreateStepDto) {
    try {
      let step;

      if (dto.type === 'UploadDocument') {
        const newUploadDocument = await this.uploadDocumentRepo.save(dto.data);
        step = {
          type: dto.type,
          data: newUploadDocument._id,
        };
      }

      if (dto.type === 'CheckList') {
        const newCheckList = await this.checkListRepo.save(dto.data);
        step = {
          type: dto.type,
          data: newCheckList._id,
        };
      }

      return this.onboardingStepsRepo.save(step);
    } catch (error) {
      console.log(error);
    }
  }

  async updateStep(id: string, dto: CreateStepDto) {
    try {
      if (dto.type === 'UploadDocument') {
        console.log(id);
        const documentStep = await this.onboardingStepsRepo.findById(id);

        if(!documentStep){
          throw new NotFoundException('Step Not Found')
        }
        
        return this.uploadDocumentRepo.findOneAndUpdate(
          { _id: documentStep.data },
          dto.data,
        );
      }

      if (dto.type === 'CheckList') {
        const documentStep = await this.onboardingStepsRepo.findById(id);

        if(!documentStep){
          throw new NotFoundException('Step Not Found')
        }
        console.log(documentStep)
        return this.checkListRepo.findOneAndUpdate(
          { _id: documentStep.data },
          dto.data,
        );
      }

      return;
    } catch (error) {
      console.log(error);
    }
  }

  async updateAssignedStep(id: string, dto: CreateStepDto) {
    console.log(dto)
    console.log(id)
    try {
      if (dto.type === 'UploadDocument') {
        const documentStep = await this.assignedStepsRepo.findById(id);

        if(!documentStep){
          throw new NotFoundException('Step Not Found')
        }
        
        return this.uploadDocumentRepo.findOneAndUpdate(
          { _id: documentStep.data },
          dto.data,
        );
      }

      if (dto.type === 'CheckList') {
        const documentStep = await this.assignedStepsRepo.findById(id);

        if(!documentStep){
          throw new NotFoundException('Step Not Found')
        }
        console.log(documentStep)
        return this.checkListRepo.findOneAndUpdate(
          { _id: documentStep.data },
          dto.data,
        );
      }

      return;
    } catch (error) {
      console.log(error);
    }
  }


  async createSignDocumentStep(
    docs: Express.Multer.File[],
    dto: CreateSignDocumentStepDto,
  ) {
    try {
      const documentDetails = await FirebaseStorage.uploadFiles(docs);
      const newSignDocumentData = {
        ...dto,
        documents: documentDetails,
      };
      const step = await this.signDocumentRepo.save(newSignDocumentData);

      return this.onboardingStepsRepo.save({
        type: 'SignDocument',
        data: step._id,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllSteps(): Promise<any> {
    const steps = await this.onboardingStepsRepo.findPaginated(
      10,
      1,
      {},
      'data',
    );
    return steps;
  } 

  async deleteStep(id: string) {
    return this.onboardingStepsRepo.findOneAndDelete({_id: id})
  }

  async createAssignedStepFromOnboardingStep(id: string | Types.ObjectId, order){
    try {
      const step = await this.onboardingStepsRepo.findById(id, 'data')
      if(!step){
        throw new NotFoundException('Step Not Found')
      }
        return this.createAssignedSteps([
          {
            step,
            order
          },
        ])
    } catch (error) {
      throw error
    }
  }
  async createAssignedSteps(steps) {
    try {
      let stepIds = [];
      for (const step of steps) {
        if (step.step.type === 'UploadDocument') {
          const newUploadDocument = await this.uploadDocumentRepo.save({
            title: step.step.data.title,
            overview: step.step.data.overview,
            documents: step.step.data.documents,
          });
          const newStep = {
            type: step.step.type,
            data: newUploadDocument._id,
          };
          const savedSteps = await this.assignedStepsRepo.save(newStep);
          stepIds.push({
            step: savedSteps._id,
            order: step.order,
          });
        }

        if (step.step.type === 'SignDocument') {
          const newSignDocument = await this.signDocumentRepo.save({
            title: step.step.data.title,
            overview: step.step.data.overview,
            documents: step.step.data.documents,
            signedDocuments: step.step.data.signedDocuments,
          });
          const newStep = {
            type: step.step.type,
            data: newSignDocument._id,
          };
          const savedSteps = await this.assignedStepsRepo.save(newStep);
          stepIds.push({
            step: savedSteps._id,
            order: step.order,
          });
        }

        if (step.step.type === 'CheckList') {
          const newCheckList = await this.checkListRepo.save({
            title: step.step.data.title,
            overview: step.step.data.overview,
            items: step.step.data.items,
            approved: step.step.data.approved,
          });
          const newStep = {
            type: step.step.type,
            data: newCheckList._id,
          };
          const savedSteps = await this.assignedStepsRepo.save(newStep);
          stepIds.push({
            step: savedSteps._id,
            order: step.order,
          });
        }
      }
      return stepIds;
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  async submitStep(step: string, documentName: string, data) {
    try {
      const stepData = await this.assignedStepsRepo.findById(step);

      if (!stepData) {
        throw new NotFoundException('No step found');
      }

      console.log(stepData.type);

      if (stepData.type === 'UploadDocument') {
        const updatedDocument = await this.uploadDocumentRepo.findOneAndUpdate(
          { _id: stepData.data, 'documents.name': documentName },
          { $set: { 'documents.$.url': data.url } },
        );
        return updatedDocument;
      }

      if (stepData.type === 'SignDocument') {
        const query = { _id: stepData.data, 'documents.name': documentName }
        const update = {};
        
        const signDocument = await this.signDocumentRepo.findOne(
          query
        );

         // Check if the array is empty
        if (Array.isArray(signDocument) && signDocument.length > 0) {
          // If not empty, update the specific element with $set
          update['$set'] = { 'signedDocuments.$': { name: documentName, url: data.url } };
        } else {
          // If empty, set the entire array
          update['$set'] = { 'signedDocuments': [{ name: documentName, url: data.url }] };
        }

        const updatedDocument = await this.signDocumentRepo.findOneAndUpdate(
          query,
          update,
        );
        return updatedDocument;
      }

      if (stepData.type === 'CheckList') {
        const updatedDocument = await this.checkListRepo.findOneAndUpdate(
          { _id: stepData.data, 'items.label': documentName },
          { $set: { 'items.$.completed': true } },
        );
        return updatedDocument;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  //   async getWorkflowById(id: string): Promise<OnboardingWorkflow | null> {
  //     const workflow = await this.onboardingWorkflowRepo.findOne(id);
  //     return workflow;
  //   }

  // async getAllWorkflows(): Promise<any> {
  //   const workflows = await this.onboardingWorkflowRepo.findPaginated();
  //   console.log(workflows);
  //   return workflows;
  // }

  //   async updateWorkflow(id: string, title: string, overview: string): Promise<OnboardingWorkflow | null> {
  //     const updatedWorkflow = await this.onboardingWorkflowRepo.findOneAndUpdate(
  //       { id }, // Assuming you have an id field
  //       { title, overview }
  //     );
  //     return updatedWorkflow;
  //   }

  //   async deleteWorkflow(id: string): Promise<{ success: boolean }> {
  //     const deleteResult = await this.onboardingWorkflowRepo.findOneAndDelete({ id });
  //     return { success: deleteResult.status };
  //   }
}
