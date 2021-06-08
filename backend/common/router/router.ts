import * as restify from 'restify';
import { EventEmitter } from 'events';

// Environment //
import { environment } from '../environment';
import { RouterOptions } from './router.options';
import { RedisClient } from '../redis/redis';

export abstract class Router extends EventEmitter {

    redis: RedisClient;

    applyRedis = (client: RedisClient) => {
        this.redis = client;
    }

    abstract applyRoutes(application: restify.Server);
    
    render(response: restify.Response, next: restify.Next, options?: RouterOptions) {
        this.emit('beforeRenderAPI', options['response']);
        options = this.parseOptions(options);
        options = this.parseError(options);
        return this.sendResponse(response, next, options);
    }

    renderThen(response: restify.Response, next: restify.Next, options?: RouterOptions) {
        return (document) => {
            this.emit('beforeRenderAPI', document);
            
            options.response = Array.isArray(document) ? document.length > 1 ? document : document[0] : document;
            options = this.parseOptions(options);
            options = this.parseError(options);
            return this.sendResponse(response, next, options);
        };
    }

    private parseOptions(options?: RouterOptions) {
        options.success = options.success === undefined ? true : options.success;
        return options;
    }

    private parseError(options?: RouterOptions) {
        const { success } = options;
        if (success !== undefined && !success) {
            options.error = true;
        }

        return options;
    }

    sendResponse(response: restify.Response, next: restify.Next, options?: RouterOptions) {
        const { errorCode, error, success } = options;
        if (error) {
            options.errorCode = options.error = undefined;
            response.send(errorCode, options, { 'Content-Type': "application/json" });
        } else {
            response.json(options);
        }
        return next(success);
    }

    formatHostname = (host) => {
        const split = host.split('.');
        let name = '';
        for (var word of split) {
            name += word;
        }
        return name;
    };

}