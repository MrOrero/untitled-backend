import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { OnboardingWorkflow } from '../model/onboarding-workflow.model';
import { OnboardingWorkflowRepo } from '../repository/onboarding-workflow.repository';
import { OnboardingWorkflowDomain } from '../domain/onboarding-workflow';
import { OnboardingWorkflowMap } from '../mappers/OnboardingWorkflowMap';
import { AddWorkFlowDto } from '../dtos/AddWorkFlowDto';
import { InjectionTokens } from 'src/libs/common/types/enum';
import { AddStepWorkFlowDto } from '../dtos/AddStepToWorkFlowDto';
import { OnboardingStepsService } from 'src/modules/onborading-steps/services/onboarding-steps.service';
import { AssignedWorkflowRepo } from '../repository/assigned-workflow.repository';
import { EmployeeService } from 'src/modules/users/services/employee.service';

@Injectable()
export class OnboardingWorkflowService {

  @Inject(InjectionTokens.AssignedWorkflowRepo)
  private readonly assignedWorkflowRepo: AssignedWorkflowRepo;

  @Inject()
  private readonly employeeService: EmployeeService;

  @Inject()
  private readonly onboardingStepsService: OnboardingStepsService;
  
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

  async getAllWorkflows(): Promise<any> {
    try {
      const workflows = await this.onboardingWorkflowRepo.findPaginated(10, 1 , {});
      return workflows;
      
    } catch (error) {
      console.log(error);
    }
  }

  async getWorkflowById(id: string): Promise<any> {
    try {
      const workflow = await this.onboardingWorkflowRepo.findById(id, {
        path: 'steps.step',
        populate: {
          path: 'data',
        } 
      });
      return workflow;
      
    } catch (error) {
      console.log(error);
    }
  }  

  async addStepToWorkflow(workflowId: string, dto: AddStepWorkFlowDto) {
    try {
      const order = await this.onboardingWorkflowRepo.findOne({ _id: workflowId, 'steps.order': dto.order });
      if(order) {
        throw new BadRequestException('Order already exists, change order');
      }
      return this.onboardingWorkflowRepo.addStepToWorkflow(workflowId, dto);
    } catch (error) {
      console.log(error);
    }
  }

  async assignWorkflowToEmployee(workflowId: string, employeeId: string) {
    try {
      const workflow = await this.onboardingWorkflowRepo.findById(workflowId, {
        path: 'steps.step',
        populate: {
          path: 'data',
        } 
      });
      const steps = await this.onboardingStepsService.createAssignedSteps(workflow.steps);
      const assignedWorkflowId = await this.assignedWorkflowRepo.save({
        title: workflow.title,
        overview: workflow.overview,
        steps: steps,
      });
 
      return this.employeeService.updateEmployee(employeeId, { assignedWorkflow: assignedWorkflowId._id.toString() });
    } catch (error) {
      console.log(error);
    }
  }

  // async submitWorkflow(assignedWorkflowId: string, employeeId: string, workflowData: any) {
  //   try {
  //     const workflow = await this.onboardingWorkflowRepo.findById(assignedWorkflowId, {
  //       path: 'steps.step',
  //       populate: {
  //         path: 'data',
  //       } 
  //     });
  //     if(!workflow) {
  //       throw new BadRequestException('Workflow not found');
  //     }
  //     const steps = workflow.steps;
  //     const employee = await this.employeeService.getEmployeeById(employeeId);
  //     if(!employee) {
  //       throw new BadRequestException('Employee not found');
  //     }

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
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
