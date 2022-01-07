import { query, insertQuery, updateQuery } from '../data';
import { TUser, TUserInsert, TUserUpdate } from '../data/userType';
import { UserNotFoundError } from '../errors';

const TABLE_NAME = 'users';

export const getUser = async (id: string): Promise<TUser> => {
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
): Promise<TUser> => {
    const { rows } = await insertQuery<TUserInsert, TUser>(TABLE_NAME, {
        keycloak_id: keycloak_id,
        consent_date: new Date(consent_date),
        understand_disclaimer: understand_disclaimer,
        creation_date: new Date(),
        updated_date: new Date(),
    });

    return rows[0];
};

export const updateUser = async (
    keycloak_id: string,
    consent_date: string,
    understand_disclaimer: boolean,
): Promise<TUser> => {
    const { rows } = await updateQuery<TUserUpdate, TUser>(TABLE_NAME, 'keycloak_id', keycloak_id, {
        consent_date: new Date(consent_date),
        understand_disclaimer: understand_disclaimer,
        updated_date: new Date(),
    });

    return rows[0];
};

export const deleteUser = async (keycloak_id: string): Promise<void> => {
    await query('DELETE FROM users where keycloak_id = $1', [keycloak_id]);
};
