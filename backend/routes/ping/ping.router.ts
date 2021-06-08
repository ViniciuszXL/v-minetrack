import * as restify from 'restify';

// Imports //
import { PingRouterCommon } from './ping.router.common';

class PingRouter extends PingRouterCommon {

    applyRoutes(application: restify.Server) {

        // Ping //
        application.get('/api/minecraft/ping/:host', this.ping);

    }

}

export const pingRouter = new PingRouter();