import { Server } from './server/server';

// Routes //
import { pingRouter } from './routes/ping/ping.router';

const server = new Server();

server.bootstrap([ pingRouter ]).then(server => {
    console.log('Server is listening on:', server.application.address());
}).catch(err => {
    console.log('Server failed to start!');
    console.error(err);
    process.exit(1);
})