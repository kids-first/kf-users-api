import { query } from '../data';
import { User } from '../data/userType';
import { UserNotFoundError } from '../errors';

export const getUser = async (id: string): Promise<User> => {
    const { rows } = await query('SELECT * FROM users WHERE keycloak_id = $1', [id]);
    if (rows.length === 0) {
        throw new UserNotFoundError(id);
    }
    return rows[0];
};

export const createUser = async (
    keycloak_id: string,
    consent_date: string,
    understand_disclaimer: boolean,
): Promise<User> => {
    const { rows } = await query(
        'INSERT INTO users (keycloak_id, consent_date, understand_disclaimer, creation_date, updated_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [keycloak_id, new Date(consent_date), understand_disclaimer, new Date(), new Date()],
    );
    return rows[0];
};

export const updateUser = async (
    keycloak_id: string,
    consent_date: string,
    understand_disclaimer: boolean,
): Promise<User> => {
    const { rows } = await query(
        'UPDATE users SET consent_date = $1, understand_disclaimer = $2, updated_date = $3 WHERE keycloak_id = $4 RETURNING *',
        [new Date(consent_date), understand_disclaimer, new Date(), keycloak_id],
    );
    return rows[0];
};

export const deleteUser = async (keycloak_id: string): Promise<void> => {
    await query('DELETE FROM users where keycloak_id = $1', [keycloak_id]);
};
