import config from './config/configuration';
import Server from './server';

const server = new Server(config);
server.bootstrap();
server.run();
