import { Schema, Types, model } from 'mongoose';

export interface Item {
    label: string;
    completed: boolean;
}

export interface CheckList {
    _id?: Types.ObjectId;
    title: string;
    overview: string;
    items: Item[];
    approved?: boolean;
}

class CheckListModel {
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
            items: [
                {
                    label: {
                        type: String,
                        required: true,
                    },
                    completed: {
                        type: Boolean,
                        default: false,
                    }
                }
            ],
            approved: {
                type: Boolean,
                default: false,
            }
        },
        { timestamps: true },
    );

    static getModel() {
        return model<CheckList>('CheckList', this.schema);
    }
}

export default CheckListModel;
