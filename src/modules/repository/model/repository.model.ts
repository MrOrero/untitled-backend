import { Schema, model, Types } from 'mongoose';


export interface Repository  {
    name: string;
    url: string;
    companyId: string;
}

class RepositoryModel {
    private static schema: Schema = new Schema(
        {
            companyId: {
                type: Schema.Types.ObjectId,
                ref: 'Company',
                required: true,
              },
            name: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
        { timestamps: true },
    );

    static getModel() {
        return model<Repository>('Repository', this.schema);
    }
}

export default RepositoryModel;
