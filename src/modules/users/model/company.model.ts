import { Schema, model } from 'mongoose';

export interface Company {
  name: string;
  address: string;
  industry: string;
  email: string;
  taxId: string;
  password: string;
  hasChangedPassword?: boolean;
}

class CompanyModel {
  private static schema: Schema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      industry: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      taxId: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      hasChangedPassword: {
        type: Boolean,
        default: false,
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
    return model<Company>('Company', this.schema);
  }
}

export default CompanyModel;
