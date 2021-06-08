import * as mongoose from 'mongoose';

// Environment //
import { environment } from '../environment';

export class Mongo {

    mongoConnection: mongoose.Connection;

    startConnection(): Promise<any> {
        return new Promise((resolve, reject) => {
            mongoose.connect(
                `${ environment.MONGO.URI }${ environment.MONGO.HOST }:${ environment.MONGO.PORT }/${ environment.MONGO.DATABASE }`,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useFindAndModify: true,
                    useCreateIndex: true,
                    autoReconnect: true,
                    maxPoolSize: 10
                }
            )

            .then(connection => {
                this.mongoConnection = connection.connection;
                resolve(this.mongoConnection);
            })

            .catch(reject);
        });
    }

    closeConnection() {
        return this.mongoConnection.close();
    }

}