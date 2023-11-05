import { AbstractRepo } from "src/libs/db/AbstractRepo";
import AssignedStepModel, { AssignedStep } from "../model/assigned-steps.model";

export class AssignedStepsRepo extends AbstractRepo<AssignedStep>{
    constructor() {
        super(AssignedStepModel.getModel());
      }
    
}