import { AbstractRepo } from "src/libs/db/AbstractRepo";
import OnboardingWorkflowModel, { OnboardingWorkflow } from "../model/onboarding-workflow.model";

export class OnboardingWorkflowRepo extends AbstractRepo<OnboardingWorkflow>{
    constructor() {
        super(OnboardingWorkflowModel.getModel());
      }

    addStepToWorkflow(workflowId: string, stepId: string): Promise<OnboardingWorkflow> {
        return OnboardingWorkflowModel.getModel().findOneAndUpdate({ _id: workflowId }, { $push: { steps: { step: stepId } } }, { new: true }).populate('steps.step');
    }
    
}