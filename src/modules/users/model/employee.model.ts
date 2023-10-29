import { Schema, model } from 'mongoose';

export interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  phoneNumber: string;
  role: string;
  department: string;
}

class EmployeeModel {
  private static schema: Schema = new Schema(
    {
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
        required: true,
      },
      department: {
        type: String,
        required: true,
      },
    },
    { timestamps: true },
  );

  static getModel() {
    return model<Employee>('Employee', this.schema);
  }
}

export default EmployeeModel;
