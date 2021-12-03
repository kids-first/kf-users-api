import { Pool } from 'pg';

import { dbHost, dbName, dbPassword, dbPort, dbUser } from '../env';

const pool = new Pool({
    user: dbUser,
    host: dbHost,
    database: dbName,
    password: dbPassword,
    port: dbPort,
});

export const query = (text: string, params: any) => pool.query(text, params);

export const closeConnection = () => pool.end();
