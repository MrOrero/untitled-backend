import { Schema, Types, model } from 'mongoose';

export interface DocumentInfo {
    name: string;
    url: string;
}

export interface UploadDocument {
    _id? : Types.ObjectId;
    title: string;
    overview: string;
    documents: DocumentInfo[];
}

class UploadDocumentModel {
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
            documents: [
                {
                    name: {
                        type: String,
                        required: true,
                    },
                    url: {
                        type: String,
                        default: '',
                    }
                }
            ]
        },
        { timestamps: true },
    );

    static getModel() {
        return model<UploadDocument>('UploadDocument', this.schema);
    }
}

export default UploadDocumentModel;
