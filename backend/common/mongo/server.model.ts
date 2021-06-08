import * as mongoose from 'mongoose';

export interface Server extends mongoose.Document {

}

const schema = new mongoose.Schema({
    host: {
        type: String,
        required: true
    },
    port: {
        type: String,
        required: true
    },
    version: {
        type: String,
        required: true
    },
    protocolVersion: {
        type: String,
        required: true
    },
    onlinePlayers: {
        type: String,
        required: true
    },
    maxPlayers: {
        type: String,
        required: true
    },
    
});