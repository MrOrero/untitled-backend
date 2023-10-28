import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { OnboardingWorkflow } from '../model/onboarding-workflow.model';
import { OnboardingWorkflowRepo } from '../repository/onboarding-workflow.repository';
import { OnboardingWorkflowDomain } from '../domain/onboarding-workflow';
import { OnboardingWorkflowMap } from '../mappers/OnboardingWorkflowMap';
import { AddWorkFlowDto } from '../dtos/AddWorkFlowDto';
import { InjectionTokens } from 'src/libs/common/types/enum';

@Injectable()
export class OnboardingWorkflowService {
  
  constructor(@Inject(InjectionTokens.OnboardingWorkflowRepo)private readonly onboardingWorkflowRepo: OnboardingWorkflowRepo) {}

  async createWorkflow(dto: AddWorkFlowDto) {

    try {
      const newWorkfloworError = OnboardingWorkflowDomain.create(dto);
   
      if(newWorkfloworError.isFailure) {
        throw new BadRequestException(newWorkfloworError.errorValue());
      }
  
      const newWorkflow = newWorkfloworError.getValue();
  
      const data = OnboardingWorkflowMap.toPersistence(newWorkflow);
     
      return this.onboardingWorkflowRepo.save(data);
    } catch (error) {
      console.log(error);
    }

  }

//   async getWorkflowById(id: string): Promise<OnboardingWorkflow | null> {
//     const workflow = await this.onboardingWorkflowRepo.findOne(id);
//     return workflow;
//   }

  async getAllWorkflows(): Promise<any> {
    try {
      const workflows = await this.onboardingWorkflowRepo.findPaginated(10, 1 , {}, {
        path: 'steps.step',
        populate: {
          path: 'data',
        } 
      });
      return workflows;
      
    } catch (error) {
      console.log(error);
    }
  }

  async addStepToWorkflow(workflowId: string, stepId: string) {
    console.log(workflowId, stepId);
    try {
      return this.onboardingWorkflowRepo.addStepToWorkflow(workflowId, stepId);
    } catch (error) {
      console.log(error);
    }
  }
  // async updateWorkflow(id: string, title: string, overview: string): Promise<OnboardingWorkflow | null> {
  //   const updatedWorkflow = await this.onboardingWorkflowRepo.findOneAndUpdate(

  //   );
  //   return updatedWorkflow;
  // }

//   async deleteWorkflow(id: string): Promise<{ success: boolean }> {
//     const deleteResult = await this.onboardingWorkflowRepo.findOneAndDelete({ id });
//     return { success: deleteResult.status };
//   }
}
