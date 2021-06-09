import * as mongoose from 'mongoose';

export interface Authorization extends mongoose.Document {
    token: String,
    timestamp: Number
}

const schema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    }
});

export const Authorization = mongoose.model<Authorization>('auths', schema);