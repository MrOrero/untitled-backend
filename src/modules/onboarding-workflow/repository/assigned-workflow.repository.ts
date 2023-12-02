import { AbstractRepo } from 'src/libs/db/AbstractRepo';
import AssignedWorkflowModel, {
  AssignedWorkflow,
} from '../model/assigned-workflow.model';
import { AddStepWorkFlowDto } from '../dtos/AddStepToWorkFlowDto';
import { AddStepToAssignedWorkFlowDto } from '../dtos/AddStepToAssignedWorkflowDto';

export class AssignedWorkflowRepo extends AbstractRepo<AssignedWorkflow> {
  constructor() {
    super(AssignedWorkflowModel.getModel());
  }

  addStepToWorkflow(
    workflowId: string,
    dto: AddStepToAssignedWorkFlowDto,
  ): Promise<AssignedWorkflow> {
    return AssignedWorkflowModel.getModel()
      .findOneAndUpdate(
        { _id: workflowId },
        { $push: { steps: { step: dto.stepId, order: dto.order } } },
        { new: true },
      )
      .populate('steps.step');
  }
}
