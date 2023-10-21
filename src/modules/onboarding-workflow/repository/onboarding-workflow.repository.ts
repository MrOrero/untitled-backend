import { AbstractRepo } from "src/libs/db/AbstractRepo";
import OnboardingWorkflowModel, { OnboardingWorkflow } from "../model/onboarding-workflow.model";

export class OnboardingWorkflowRepo extends AbstractRepo<OnboardingWorkflow>{
    constructor() {
        super(OnboardingWorkflowModel.getModel());
      }
    
}