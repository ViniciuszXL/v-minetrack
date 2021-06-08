import * as restify from 'restify';
import * as corsMiddleware from 'restify-cors-middleware';

// Environment //
import { Router } from '../common/router/router';
import { environment } from '../common/environment';

// MongoDB //
import { Mongo } from '../common/mongo/mongo';
import { RedisClient } from '../common/redis/redis';

export class Server {

    application: restify.Server;
    mongo: Mongo = new Mongo();
    redis: RedisClient = new RedisClient();

    initializeRedis(): Promise<any> {
        return this.redis.startConnection();
    }

    initializeMongo(): Promise<any> {
        return this.mongo.startConnection();
    }

    initRoutes(routers: Router[]): Promise<any> {
        return new Promise((resolve, reject) => {
            try {

                this.application = restify.createServer({
                    name: environment.APPLICATION.NAME,
                    version: environment.APPLICATION.VERSION
                });

                // Plugins //
                this.application.use(restify.plugins.queryParser());
                this.application.use(restify.plugins.bodyParser());

                // Routes //
                for (var router of routers) {
                    router.applyRedis(this.redis);
                    router.applyRoutes(this.application);
                }

                // Starting //
                this.application.listen(environment.SERVER.PORT, () => resolve(this.application));
            } catch (err) {
                reject(err);
            }
        });
    }

    bootstrap(routers: Router[] = []): Promise<Server> {
        return this.initializeRedis().then(() => this.initializeMongo().then(() => this.initRoutes(routers).then(() => this)));
        //return this.initRoutes(routers).then(() => this);
    }

    shutdown() {
        return this.mongo.closeConnection().then(() => this.application.close());
    }

}