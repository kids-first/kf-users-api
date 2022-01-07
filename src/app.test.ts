import { Express } from 'express';
import Keycloak from 'keycloak-connect';
import request from 'supertest';

import { getToken, publicKey } from '../test/authTestUtils';
import buildApp from './app';
import { TUser } from './data/userType';
import { createUser, deleteUser, getUser, updateUser } from './service/user';

jest.mock('./service/user');

const checkBody = (expectedBody) => (res) => {
    expect(JSON.stringify(res.body)).toEqual(JSON.stringify(expectedBody));
};

describe('Express app', () => {
    let app: Express;
    let keycloakFakeConfig;

    beforeEach(() => {
        const publicKeyToVerify = publicKey;
        keycloakFakeConfig = {
            realm: 'master',
            'confidential-port': 0,
            'bearer-only': true,
            'auth-server-url': 'http://localhost:8080/auth',
            'ssl-required': 'external',
            resource: 'keycloakFakeCLient',
            'realm-public-key': publicKeyToVerify, // For test purpose, we use public key to validate token.
        };
        const keycloak = new Keycloak({}, keycloakFakeConfig);
        app = buildApp(keycloak); // Re-create app between each test to ensure isolation between tests.
    });

    describe('GET /status', () => {
        it('should return 200', async () => request(app).get('/status').expect(200));
    });

    describe('GET /user', () => {
        beforeEach(() => {
            (getUser as jest.Mock).mockReset();
        });

        it('should return 403 if no Authorization header', async () => request(app).get('/user').expect(403));

        it('should return 403 if Authorization header contain expired token', async () => {
            const token = getToken(-1000);
            await request(app)
                .get('/user')
                .set({ Authorization: `Bearer ${token}` })
                .expect(403);
        });

        it('should return 500 if Authorization header is valid but an error occurs', async () => {
            const expectedError = new Error('OOPS');
            (getUser as jest.Mock).mockImplementation(() => {
                throw expectedError;
            });

            const token = getToken(1000, 'keycloak_id');
            await request(app)
                .get('/user')
                .set({ Authorization: `Bearer ${token}` })
                .expect(500, { error: 'Internal Server Error' });
            expect((getUser as jest.Mock).mock.calls.length).toEqual(1);
            expect((getUser as jest.Mock).mock.calls[0][0]).toEqual('keycloak_id');
        });

        it('should return 200 with the user returned by service if Authorization header is valid', async () => {
            const expectedUser: TUser = {
                id: 123,
                keycloak_id: 'keycloak_id',
                understand_disclaimer: true,
                creation_date: new Date(),
                updated_date: new Date(),
                consent_date: new Date(),
            };

            (getUser as jest.Mock).mockImplementation(() => expectedUser);

            const token = getToken(1000, 'keycloak_id');
            await request(app)
                .get('/user')
                .set({ Authorization: `Bearer ${token}` })
                .expect(checkBody(expectedUser))
                .expect(200);

            expect((getUser as jest.Mock).mock.calls.length).toEqual(1);
            expect((getUser as jest.Mock).mock.calls[0][0]).toEqual('keycloak_id');
        });
    });

    describe('POST /user', () => {
        const postUserBody = {
            consent_date: new Date(),
            understand_disclaimer: true,
        };

        beforeEach(() => {
            (createUser as jest.Mock).mockReset();
        });

        it('should return 403 if no Authorization header', async () =>
            request(app).post('/user').send(postUserBody).set('Content-type', 'application/json').expect(403));

        it('should return 403 if Authorization header contain expired token', async () => {
            const token = getToken(-1000);
            await request(app)
                .post('/user')
                .send(postUserBody)
                .set('Content-type', 'application/json')
                .set({ Authorization: `Bearer ${token}` })
                .expect(403);
        });

        it('should return 500 if Authorization header is valid but an error occurs', async () => {
            const expectedError = new Error('OOPS');
            (createUser as jest.Mock).mockImplementation(() => {
                throw expectedError;
            });

            const token = getToken(1000, 'keycloak_id');
            await request(app)
                .post('/user')
                .send(postUserBody)
                .set('Content-type', 'application/json')
                .set({ Authorization: `Bearer ${token}` })
                .expect(500, { error: 'Internal Server Error' });
            expect((createUser as jest.Mock).mock.calls.length).toEqual(1);
            expect((createUser as jest.Mock).mock.calls[0][0]).toEqual('keycloak_id');
            expect((createUser as jest.Mock).mock.calls[0][1]).toEqual(postUserBody.consent_date.toISOString());
            expect((createUser as jest.Mock).mock.calls[0][2]).toEqual(postUserBody.understand_disclaimer);
        });

        it('should return 200 with the user returned by service if Authorization header is valid', async () => {
            const expectedUser: TUser = {
                id: 123,
                keycloak_id: 'keycloak_id',
                understand_disclaimer: postUserBody.understand_disclaimer,
                creation_date: new Date(),
                updated_date: new Date(),
                consent_date: postUserBody.consent_date,
            };

            (createUser as jest.Mock).mockImplementation(() => expectedUser);

            const token = getToken(1000, 'keycloak_id');
            await request(app)
                .post('/user')
                .send(postUserBody)
                .set('Content-type', 'application/json')
                .set({ Authorization: `Bearer ${token}` })
                .expect(checkBody(expectedUser))
                .expect(201);

            expect((createUser as jest.Mock).mock.calls.length).toEqual(1);
            expect((createUser as jest.Mock).mock.calls[0][0]).toEqual('keycloak_id');
            expect((createUser as jest.Mock).mock.calls[0][1]).toEqual(postUserBody.consent_date.toISOString());
            expect((createUser as jest.Mock).mock.calls[0][2]).toEqual(postUserBody.understand_disclaimer);
        });
    });

    describe('PUT /user', () => {
        const putUserBody = {
            consent_date: new Date(),
            understand_disclaimer: true,
        };

        beforeEach(() => {
            (updateUser as jest.Mock).mockReset();
        });

        it('should return 403 if no Authorization header', async () =>
            request(app).put('/user').send(putUserBody).set('Content-type', 'application/json').expect(403));

        it('should return 403 if Authorization header contain expired token', async () => {
            const token = getToken(-1000);
            await request(app)
                .put('/user')
                .send(putUserBody)
                .set('Content-type', 'application/json')
                .set({ Authorization: `Bearer ${token}` })
                .expect(403);
        });

        it('should return 500 if Authorization header is valid but an error occurs', async () => {
            const expectedError = new Error('OOPS');
            (updateUser as jest.Mock).mockImplementation(() => {
                throw expectedError;
            });

            const token = getToken(1000, 'keycloak_id');
            await request(app)
                .put('/user')
                .send(putUserBody)
                .set('Content-type', 'application/json')
                .set({ Authorization: `Bearer ${token}` })
                .expect(500, { error: 'Internal Server Error' });
            expect((updateUser as jest.Mock).mock.calls.length).toEqual(1);
            expect((updateUser as jest.Mock).mock.calls[0][0]).toEqual('keycloak_id');
            expect((updateUser as jest.Mock).mock.calls[0][1]).toEqual(putUserBody.consent_date.toISOString());
            expect((updateUser as jest.Mock).mock.calls[0][2]).toEqual(putUserBody.understand_disclaimer);
        });

        it('should return 200 with the user returned by service if Authorization header is valid', async () => {
            const expectedUser: TUser = {
                id: 123,
                keycloak_id: 'keycloak_id',
                understand_disclaimer: putUserBody.understand_disclaimer,
                creation_date: new Date(),
                updated_date: new Date(),
                consent_date: putUserBody.consent_date,
            };

            (updateUser as jest.Mock).mockImplementation(() => expectedUser);

            const token = getToken(1000, 'keycloak_id');
            await request(app)
                .put('/user')
                .send(putUserBody)
                .set('Content-type', 'application/json')
                .set({ Authorization: `Bearer ${token}` })
                .expect(checkBody(expectedUser))
                .expect(200);

            expect((updateUser as jest.Mock).mock.calls.length).toEqual(1);
            expect((updateUser as jest.Mock).mock.calls[0][0]).toEqual('keycloak_id');
            expect((updateUser as jest.Mock).mock.calls[0][1]).toEqual(putUserBody.consent_date.toISOString());
            expect((updateUser as jest.Mock).mock.calls[0][2]).toEqual(putUserBody.understand_disclaimer);
        });
    });

    describe('DELETE /user', () => {
        beforeEach(() => {
            (deleteUser as jest.Mock).mockReset();
        });

        it('should return 403 if no Authorization header', async () => request(app).delete('/user').expect(403));

        it('should return 403 if Authorization header contain expired token', async () => {
            const token = getToken(-1000);
            await request(app)
                .delete('/user')
                .set({ Authorization: `Bearer ${token}` })
                .expect(403);
        });

        it('should return 500 if Authorization header is valid but an error occurs', async () => {
            const expectedError = new Error('OOPS');
            (deleteUser as jest.Mock).mockImplementation(() => {
                throw expectedError;
            });

            const token = getToken(1000, 'keycloak_id');
            await request(app)
                .delete('/user')
                .set({ Authorization: `Bearer ${token}` })
                .expect(500, { error: 'Internal Server Error' });
            expect((deleteUser as jest.Mock).mock.calls.length).toEqual(1);
            expect((deleteUser as jest.Mock).mock.calls[0][0]).toEqual('keycloak_id');
        });

        it('should return 200 with the user id if Authorization header is valid', async () => {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            (deleteUser as jest.Mock).mockImplementation(() => {});

            const token = getToken(1000, 'keycloak_id');
            await request(app)
                .delete('/user')
                .set({ Authorization: `Bearer ${token}` })
                .expect(200, 'keycloak_id');

            expect((deleteUser as jest.Mock).mock.calls.length).toEqual(1);
            expect((deleteUser as jest.Mock).mock.calls[0][0]).toEqual('keycloak_id');
        });
    });
});
