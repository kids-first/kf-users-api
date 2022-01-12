import cors from 'cors';
import express, { Express } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Keycloak } from 'keycloak-connect';

import { version } from '../package.json';
import { keycloakURL } from './env';
import { globalErrorHandler, globalErrorLogger } from './errors';
import { completeRegistration, createUser, deleteUser, getUser, updateUser } from './service/user';

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

    app.get('/user', keycloak.protect(), async (req, res, next) => {
        try {
            const keycloak_id = req['kauth']?.grant?.access_token?.content?.sub;
            const result = await getUser(keycloak_id);
            res.send(result);
        } catch (e) {
            next(e);
        }
    });

    app.post('/user', keycloak.protect(), async (req, res, next) => {
        try {
            const keycloak_id = req['kauth']?.grant?.access_token?.content?.sub;
            const result = await createUser(keycloak_id, req.body);
            res.status(StatusCodes.CREATED).send(result);
        } catch (e) {
            next(e);
        }
    });

    app.put('/user', keycloak.protect(), async (req, res, next) => {
        try {
            const keycloak_id = req['kauth']?.grant?.access_token?.content?.sub;
            const result = await updateUser(keycloak_id, req.body);
            res.status(StatusCodes.OK).send(result);
        } catch (e) {
            next(e);
        }
    });

    app.put('/user/complete-registration', keycloak.protect(), async (req, res, next) => {
        try {
            const keycloak_id = req['kauth']?.grant?.access_token?.content?.sub;
            const result = await completeRegistration(keycloak_id, req.body);
            res.status(StatusCodes.OK).send(result);
        } catch (e) {
            next(e);
        }
    });

    app.delete('/user', keycloak.protect(), async (req, res, next) => {
        try {
            const keycloak_id = req['kauth']?.grant?.access_token?.content?.sub;
            await deleteUser(keycloak_id);
            res.status(StatusCodes.OK).send(keycloak_id);
        } catch (e) {
            next(e);
        }
    });

    app.use(globalErrorLogger, globalErrorHandler);

    return app;
};
