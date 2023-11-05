import { Schema, model, Document, Types } from 'mongoose';

export interface OnboardingStepInfo {
    step: Schema.Types.ObjectId;
    order: number;
}

export interface AssignedWorkflow  {
    _id?: Types.ObjectId;
    title: string;
    overview: string;
    steps: OnboardingStepInfo[];
}

class AssignedWorkflowModel {
    private static schema: Schema = new Schema(
        {
            title: {
                type: String,
                required: true,
            },
            overview: {
                type: String,
                required: true,
            },
            steps: [
                {
                    step: {
                        type: Schema.Types.ObjectId,
                        ref: 'AssignedStep',
                        required: true,
                    },
                    order: {
                        type: Number,
                        required: true,
                    }
                }
            ]
        },
        { timestamps: true },
    );

    static getModel() {
        return model<AssignedWorkflow>('AssignedWorkflow', this.schema);
    }
}

export default AssignedWorkflowModel;
