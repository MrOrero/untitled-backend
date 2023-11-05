import { AbstractRepo } from "src/libs/db/AbstractRepo";
import AssignedWorkflowModel, { AssignedWorkflow } from "../model/assigned-workflow.model";

export class AssignedWorkflowRepo extends AbstractRepo<AssignedWorkflow>{
    constructor() {
        super(AssignedWorkflowModel.getModel());
      }
}