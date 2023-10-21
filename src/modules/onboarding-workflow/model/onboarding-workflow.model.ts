import { Schema, Document, model } from 'mongoose';

export interface OnboardingWorkflow  {
    title: string;
    overview: string;
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
        },
        { timestamps: true },
    );

    static getModel() {
        return model<OnboardingWorkflow>('OnboardingWorkflow', this.schema);
    }
}

export default OnboardingWorkflowModel;
