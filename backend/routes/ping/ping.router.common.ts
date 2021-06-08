import { Router } from '../../common/router';

// API //
import * as minecraftPinger from '../../common/api/minecraft.pinger';
import { environment } from '../../common/environment';

export abstract class PingRouterCommon extends Router {

    ping = (req, resp, next) => {
        const { host } = req.params;
        const pinger = new minecraftPinger.MinecraftPing(host);
        
    }

}