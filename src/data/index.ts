import { Pool } from 'pg';
import format from 'pg-format';

import { dbHost, dbName, dbPassword, dbPort, dbUser } from '../env';

const pool = new Pool({
    user: dbUser,
    host: dbHost,
    database: dbName,
    password: dbPassword,
    port: dbPort,
});

export const query = (text: string, params: any) => pool.query(text, params);

export const insertQuery = <I, O = I>(table: string, data: I) => {
    const values = Object.values(data);
    const query = format(
        'INSERT INTO %I (%s) VALUES (%s) RETURNING *',
        table,
        formatColumns<I>(data),
        formatValueIds(values),
    );

    return pool.query<O>(query, values);
};

export const updateQuery = <I, O = I>(table: string, keyCol: string, keyId: string, data: I) => {
    const values = Object.values(data);
    const query = format(
        'UPDATE %I SET (%s) = (%s) WHERE %s = %L RETURNING *',
        table,
        formatColumns<I>(data),
        formatValueIds(values),
        keyCol,
        keyId,
    );

    return pool.query<O>(query, values);
};

export const deleteQuery = (table: string, keyCol: string, keyId: string) =>
    pool.query(format('DELETE FROM %I WHERE %s = %L', table, keyCol, keyId));

const formatColumns = <T>(data: T) => Object.keys(data).join(', ');
const formatValueIds = (values: any[]) => values.map((_, index) => `$${index + 1}`).join(', ');

export const closeConnection = () => pool.end();
