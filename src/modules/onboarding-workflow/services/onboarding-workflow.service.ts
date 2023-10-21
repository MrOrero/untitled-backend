import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { OnboardingWorkflow } from '../model/onboarding-workflow.model';
import { OnboardingWorkflowRepo } from '../repository/onboarding-workflow.repository';
import { OnboardingWorkflowDomain } from '../domain/onboarding-workflow';
import { OnboardingWorkflowMap } from '../mappers/OnboardingWorkflowMap';

@Injectable()
export class OnboardingWorkflowService {
  
  constructor(@Inject('OnboardingWorkflowRepo')private readonly onboardingWorkflowRepo: OnboardingWorkflowRepo) {}

  async createWorkflow(title: string, overview: string) {

    const newWorkfloworError = OnboardingWorkflowDomain.create({title, overview});
   
    if(newWorkfloworError.isFailure) {
      throw new BadRequestException(newWorkfloworError.errorValue());
    }

    const newWorkflow = newWorkfloworError.getValue();

    const data = OnboardingWorkflowMap.toPersistence(newWorkflow);
   
    return this.onboardingWorkflowRepo.save(data);
  }

//   async getWorkflowById(id: string): Promise<OnboardingWorkflow | null> {
//     const workflow = await this.onboardingWorkflowRepo.findOne(id);
//     return workflow;
//   }

  async getAllWorkflows(): Promise<any> {
    const workflows = await this.onboardingWorkflowRepo.findPaginated();
    console.log(workflows);
    return workflows;
  }

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
