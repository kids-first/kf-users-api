import { query, insertQuery, updateQuery } from '../data';
import { TUser, TUserInsert, TUserUpdate } from '../data/userType';
import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import { validateUserRegistrationPayload } from '../utils/validator';

const TABLE_NAME = 'users';

export const getUser = async (id: string): Promise<TUser> => {
    const { rows } = await query('SELECT * FROM users WHERE keycloak_id = $1', [id]);
    if (rows.length === 0) {
        throw createError(StatusCodes.NOT_FOUND, `User with keycloak id ${id} does not exist.`);
    }
    return rows[0];
};

export const createUser = async (keycloak_id: string, body: TUserInsert): Promise<TUser> => {
    const { rows } = await insertQuery<TUserInsert, TUser>(TABLE_NAME, {
        ...body,
        keycloak_id: keycloak_id,
        creation_date: new Date(),
        updated_date: new Date(),
    });

    return rows[0];
};

export const updateUser = async (keycloak_id: string, body: TUserUpdate): Promise<TUser> => {
    // Don't allow user to update completed_registration field
    const { completed_registration, ...rest } = body;
    const { rows } = await updateQuery<TUserUpdate, TUser>(TABLE_NAME, 'keycloak_id', keycloak_id, {
        ...rest,
        updated_date: new Date(),
    });

    return rows[0];
};

export const completeRegistration = async (keycloak_id: string, body: TUserUpdate): Promise<TUser> => {
    if (!validateUserRegistrationPayload(body)) {
        throw createError(StatusCodes.BAD_REQUEST, 'Some required fields are missing to complete user registration');
    }

    const { rows } = await updateQuery<TUserUpdate, TUser>(TABLE_NAME, 'keycloak_id', keycloak_id, {
        ...body,
        completed_registration: true,
        updated_date: new Date(),
    });

    return rows[0];
};

export const deleteUser = async (keycloak_id: string): Promise<void> => {
    await query('DELETE FROM users where keycloak_id = $1', [keycloak_id]);
};
