import { Router } from '../../common/router/router';

// API //
import * as minecraftPinger from '../../common/api/minecraft.pinger';
import { environment } from '../../common/environment';
import { Authorization } from '../../common/mongo/authorization.model';

export abstract class PingRouterCommon extends Router {

    ping = async (req, resp, next) => {
        const { host } = req.params;
        const tokenAuth = req.header('Authorization');
        const pinger = new minecraftPinger.MinecraftPing(host);

        if (tokenAuth) {
            const auth = await Authorization.find({ token: tokenAuth });
            if (auth.length < 1) {
                return this.sendResponse(resp, next, { 
                    message: 'You are not allowed to use this.', 
                    errorCode: environment.CODE.NOT_ALLOWED, 
                    error: true 
                });
            }

            pinger.status()
            
            .then(this.renderThen(resp, next, { 
                message: 'Request successfully completed' 
            }))
            
            .catch(next);
        }

        const key = `${ environment.REDIS.KEY.SERVER_PING_CACHE + this.formatHostname(host).toUpperCase() }`
        this.redis.cacheFind(key).then(cache => {
            if (cache) {
                return this.render(resp, next, { 
                    response: cache, 
                    message: 'Request successfully completed.',
                    cache: true
                });
            }

            pinger.status()
            
            .then(result => {
                this.redis.cache(key, result, 60)
                
                .then(() => {
                    this.render(resp, next, { 
                        response: result, 
                        message: 'Request successfully completed',
                        cache: false
                    })
                })

                .catch(this.renderThen(resp, next, {
                    message: 'An error occurred to set cache of minecraft result!',
                    errorCode: environment.CODE.INTERN,
                    error: true
                }))
            })
            
            .catch(this.renderThen(resp, next, { 
                message: 'Server not found', 
                errorCode: environment.CODE.NOT_FOUND, 
                error: true 
            }));
        });
    }

}