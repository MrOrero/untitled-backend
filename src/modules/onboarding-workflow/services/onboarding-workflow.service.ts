import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
import { FirebaseStorage } from 'src/libs/infra/firebase-storage/firebase-storage';
import { AddStepToAssignedWorkFlowDto } from '../dtos/AddStepToAssignedWorkflowDto';

@Injectable()
export class OnboardingWorkflowService {
  @Inject(InjectionTokens.AssignedWorkflowRepo)
  private readonly assignedWorkflowRepo: AssignedWorkflowRepo;

  @Inject()
  private readonly employeeService: EmployeeService;

  @Inject()
  private readonly onboardingStepsService: OnboardingStepsService;

  constructor(
    @Inject(InjectionTokens.OnboardingWorkflowRepo)
    private readonly onboardingWorkflowRepo: OnboardingWorkflowRepo,
  ) {}

  async createWorkflow(dto: AddWorkFlowDto) {
    try {
      const newWorkfloworError = OnboardingWorkflowDomain.create(dto);

      if (newWorkfloworError.isFailure) {
        throw new BadRequestException(newWorkfloworError.errorValue());
      }

      const newWorkflow = newWorkfloworError.getValue();

      const data = OnboardingWorkflowMap.toPersistence(newWorkflow);

      return this.onboardingWorkflowRepo.save(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getAllWorkflows(): Promise<any> {
    try {
      const workflows = await this.onboardingWorkflowRepo.findPaginated(
        10,
        1,
        {},
      );
      return workflows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getWorkflowById(id: string): Promise<any> {
    try {
      const workflow = await this.onboardingWorkflowRepo.findById(id, {
        path: 'steps.step',
        populate: {
          path: 'data',
        },
      });

      if (!workflow) {
        throw new NotFoundException('No workflow found');
      }

      return workflow;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async addStepToWorkflow(workflowId: string, dto: AddStepWorkFlowDto) {
    try {
      const order = await this.onboardingWorkflowRepo.findOne({
        _id: workflowId,
        'steps.order': dto.order,
      });
      if (order) {
        throw new BadRequestException('Order already exists, change order');
      }
      return this.onboardingWorkflowRepo.addStepToWorkflow(workflowId, dto);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async addStepToAssignedWorkflow(workflowId: string, dto: AddStepToAssignedWorkFlowDto){
    try {
      const order = await this.assignedWorkflowRepo.findOne({
        _id: workflowId,
        'steps.order': dto.order,
      });
      if (order) {
        throw new BadRequestException('Order already exists, change order');
      }
      const stepId = (await this.onboardingStepsService.createAssignedStepFromOnboardingStep(dto.stepId, dto.order))[0]
      return this.assignedWorkflowRepo.addStepToWorkflow(workflowId, {
        order: stepId.order,
        stepId: stepId.step
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }  
 
  async assignWorkflowToEmployee(workflowId: string, employeeId: string) {
    try {
      const workflow = await this.onboardingWorkflowRepo.findById(workflowId, {
        path: 'steps.step',
        populate: {
          path: 'data',
        },
      });
      const steps = await this.onboardingStepsService.createAssignedSteps(
        workflow.steps,
      );
      const assignedWorkflowId = await this.assignedWorkflowRepo.save({
        title: workflow.title,
        overview: workflow.overview,
        steps: steps,
      });

      return this.employeeService.updateEmployee(employeeId, {
        assignedWorkflow: assignedWorkflowId._id.toString(),
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


  async getAssignedWorkflowById(id: string) {
    try {
      const assignedWorkflow = await this.assignedWorkflowRepo.findById(id, {
        path: 'steps.step',
        populate: {
          path: 'data',
        },
      });

      if (!assignedWorkflow) {
        throw new NotFoundException('No workflow found');
      }

      return assignedWorkflow;
    } catch (error) {
      throw error;
    }
  }

  async deleteWorkflow(id: string){
    return this.onboardingWorkflowRepo.findOneAndDelete({_id: id})
  }

  async submitStep(
    assignedWorkflowId: string,
    stepId: string,
    documentFiles: Express.Multer.File[],
    data: any,
  ) {
    try {
      const assignedWorkflow =
        await this.assignedWorkflowRepo.findById(assignedWorkflowId);

      if (!assignedWorkflow) {
        throw new NotFoundException('No workflow found');
      }

      if (documentFiles.length) {
        const documentDetails =
          await FirebaseStorage.uploadFiles(documentFiles);

        for (const doc of documentDetails) {
          const stepData = {
            url: doc.url,
          };
          await this.onboardingStepsService.submitStep(
            stepId,
            data.name,
            stepData,
          );
        }
      } else {
        await this.onboardingStepsService.submitStep(stepId, data.name, {});
      }

      return this.assignedWorkflowRepo.findById(assignedWorkflowId, {
        path: 'steps.step',
        populate: {
          path: 'data',
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
