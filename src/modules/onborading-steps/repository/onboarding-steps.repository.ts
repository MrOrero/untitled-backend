import { AbstractRepo } from "src/libs/db/AbstractRepo";
import OnboardingStepModel, { OnboardingStep } from "../model/onboarding-steps.model";

export class OnboardingStepsRepo extends AbstractRepo<OnboardingStep>{
    constructor() {
        super(OnboardingStepModel.getModel());
      }
    
}