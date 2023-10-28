import { Schema, model, Types } from 'mongoose';

export interface OnboardingStep  {
    type: string; 
    data: Types.ObjectId ; 
}

class OnboardingStepModel {
    private static schema: Schema = new Schema(
        {
            type: {
                type: String,
                enum: ['Upload', 'sign'], 
                required: true,
            },
            data: {
                type: Schema.Types.ObjectId,
                required: true,
                refPath: 'type'
            }
        },
        { timestamps: true },
    );

    static getModel() {
        return model<OnboardingStep>('OnboardingStep', this.schema);
    }
}

export default OnboardingStepModel;
