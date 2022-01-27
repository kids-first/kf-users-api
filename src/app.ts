import cors from 'cors';
import express, { Express } from 'express';
import { Keycloak } from 'keycloak-connect';
import { version } from '../package.json';
import { keycloakURL } from './env';
import { globalErrorHandler, globalErrorLogger } from './errors';
import usersRouter from './routes/user';
import savedFiltersRouter from './routes/savedFilters';

export default (keycloak: Keycloak): Express => {
    const app = express();

    app.use(cors());
    app.use(express.json({ limit: '50mb' }));

    app.use(
        keycloak.middleware({
            logout: '/logout',
            admin: '/',
        }),
    );

    app.get('/status', (_req, res) =>
        res.send({
            version,
            keycloak: keycloakURL,
        }),
    );

    app.use('/user', keycloak.protect(), usersRouter);
    app.use('/saved-filters', keycloak.protect(), savedFiltersRouter);

    app.use(globalErrorLogger, globalErrorHandler);

    return app;
};
