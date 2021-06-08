import * as restify from 'restify';
import { EventEmitter } from 'events';

// Environment //
import { environment } from './environment';
import { RouterOptions } from './router.options';

export abstract class Router extends EventEmitter {

    abstract applyRoutes(application: restify.Server);
    
    render(response: restify.Response, next: restify.Next, options?: RouterOptions) {
        return (document) => {
            this.emit
        }
    }

}