import { Schema, model, Types } from 'mongoose';

export interface AssignedStep {
  _id?: Types.ObjectId;
  type: string;
  data: Types.ObjectId;
}

class AssignedStepModel {
  private static schema: Schema = new Schema(
    {
      type: {
        type: String,
        enum: ['UploadDocument', 'SignDocument', 'CheckList'],
        required: true,
      },
      data: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'type',
      },
    },
    { timestamps: true },
  );

  static getModel() {
    return model<AssignedStep>('AssignedStep', this.schema);
  }
}

export default AssignedStepModel;
