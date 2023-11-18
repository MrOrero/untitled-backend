import { Schema, model, Document, Types } from 'mongoose';

export interface OnboardingStepInfo {
    step: Types.ObjectId;
    order: number;
}

export interface OnboardingWorkflow  {
    title: string;
    overview: string;
    steps: OnboardingStepInfo[];
}

class OnboardingWorkflowModel {
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
                        ref: 'OnboardingStep',
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
        return model<OnboardingWorkflow>('OnboardingWorkflow', this.schema);
    }
}

export default OnboardingWorkflowModel;
