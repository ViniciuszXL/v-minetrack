import * as restify from 'restify';
import * as corsMiddleware from 'restify-cors-middleware';

// Environment //
import { Router } from '../common/router/router';
import { environment } from '../common/environment';

// MongoDB //
import { Mongo } from '../common/mongo/mongo';
import { RedisClient } from '../common/redis/redis';

export class Server {

    // Variáveis //
    application: restify.Server;
    mongo: Mongo = new Mongo();
    redis: RedisClient = new RedisClient();

    // Inicialização do Redis //
    initializeRedis(): Promise<any> {
        return this.redis.startConnection();
    }

    // Inicialização do Mongo //
    initializeMongo(): Promise<any> {
        return this.mongo.startConnection();
    }

    // Inicialização das rotas //
    initRoutes(routers: Router[]): Promise<any> {
        return new Promise((resolve, reject) => {
            try {

                // Criando a aplicação //
                this.application = restify.createServer({
                    name: environment.APPLICATION.NAME,
                    version: environment.APPLICATION.VERSION
                });

                // Plugins //
                this.application.use(restify.plugins.queryParser());
                this.application.use(restify.plugins.bodyParser());

                // Routes //
                for (var router of routers) {
                    // Aplicando o redis às rotas //
                    router.applyRedis(this.redis);
                    
                    // Aplicados as rotas à aplicação //
                    router.applyRoutes(this.application);
                }

                // Starting //
                this.application.listen(environment.SERVER.PORT, () => resolve(this.application));
            } catch (err) {
                reject(err);
            }
        });
    }

    // Inicialização da aplicação //
    bootstrap(routers: Router[] = []): Promise<Server> {
        return this.initializeRedis().then(() => this.initializeMongo().then(() => this.initRoutes(routers).then(() => this)));
        //return this.initRoutes(routers).then(() => this);
    }

    // Desligamento da aplicação //
    shutdown() {
        return this.redis.closeConnection().then(() => this.mongo.closeConnection().then(() => this.application.close()));
    }

}