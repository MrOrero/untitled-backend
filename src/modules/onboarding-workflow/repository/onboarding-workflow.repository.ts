import { AbstractRepo } from "src/libs/db/AbstractRepo";
import OnboardingWorkflowModel, { OnboardingWorkflow } from "../model/onboarding-workflow.model";
import { AddStepWorkFlowDto } from "../dtos/AddStepToWorkFlowDto";

export class OnboardingWorkflowRepo extends AbstractRepo<OnboardingWorkflow>{
    constructor() {
        super(OnboardingWorkflowModel.getModel());
      }

    addStepToWorkflow(workflowId: string, dto: AddStepWorkFlowDto): Promise<OnboardingWorkflow> {
        return OnboardingWorkflowModel.getModel().findOneAndUpdate({ _id: workflowId }, { $push: { steps: { step: dto.stepId, order: dto.order } } }, { new: true }).populate('steps.step');
    }
    
}