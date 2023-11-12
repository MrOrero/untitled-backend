import { Schema, model } from 'mongoose';

export interface Employee {
  companyId?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  phoneNumber: string;
  role: string;
  department: string;
  workflowId?: string;
  jobTitle: string;
}

class EmployeeModel {
  private static schema: Schema = new Schema(
    {
      companyId: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
      },
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ['ADMIN', 'MEMBER'],
        required: true,
      },
      department: {
        type: String,
        required: true,
      },
      jobTitle: {
        type: String,
        required: true,
      },
      assignedWorkflow: {
        type: Schema.Types.ObjectId,
        ref: 'OnboardingWorkflow',
        required: false,
        default: null,
      },
    },
    {
      timestamps: true,
      toJSON: {
        transform: (doc, ret) => {
          ret.id = ret._id;
          delete ret._id;
        },
      },
    },
  );

  static getModel() {
    return model<Employee>('Employee', this.schema);
  }
}

export default EmployeeModel;
