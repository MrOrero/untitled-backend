import { Schema, Types, model } from 'mongoose';

export interface DocumentInfo {
    name: string;
    url: string;
}

export interface SignDocument {
    _id?: Types.ObjectId;
    title: string;
    overview: string;
    documents: DocumentInfo[];
    signedDocuments?: DocumentInfo[];
}

class SignDocumentModel {
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
            ],
            signedDocuments: [
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
        return model<SignDocument>('SignDocument', this.schema);
    }
}

export default SignDocumentModel;
