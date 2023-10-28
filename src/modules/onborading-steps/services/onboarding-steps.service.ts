import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateStepDto } from '../dtos/CreateStepDto';
import { OnboardingStepsRepo } from '../repository/onboarding-steps.repository';
import { OnboardingStepsDomain } from '../domain/OnboardingStepsDomain';
import { OnboardingStepsMap } from '../mappers/OnboardingStepsMap';
import { InjectionTokens } from 'src/libs/common/types/enum';

@Injectable()
export class OnboardingStepsService {
  
  constructor(@Inject(InjectionTokens.OnboardingStepsRepo)private readonly onboardingStepsRepo: OnboardingStepsRepo) {}

  async createStep(dto: CreateStepDto) {

    const newStepOrError = OnboardingStepsDomain.create(dto);
   
    if(newStepOrError.isFailure) {
      throw new BadRequestException(newStepOrError.errorValue());
    }

    const newStep = newStepOrError.getValue();

    const data = await OnboardingStepsMap.toPersistence(newStep);
   
    return this.onboardingStepsRepo.save(data);
  }

  async getAllSteps(): Promise<any> {
    const steps = await this.onboardingStepsRepo.findPaginated(10, 1, {}, 'data');
    return steps;
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
