import Keycloak from 'keycloak-connect';

import buildApp from './app';
import { port } from './env';
import keycloakConfig from './keycloak';

process.on('uncaughtException', (err) => {
    console.error(`Uncaught Exception: ${err.message}`);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled rejection at ', promise, `reason: ${reason}`);
    process.exit(1);
});

process.on('SIGINT', () => {
    console.error(`Process ${process.pid} has been interrupted`);
    process.exit(0);
});

const keycloak = new Keycloak({}, keycloakConfig);

const app = buildApp(keycloak);

app.listen(port, async () => {
    // eslint-disable-next-line no-console
    console.log(`⚡️ Listening on port ${port} ⚡️`);
});
