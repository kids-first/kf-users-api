import { ISavedFilterInput } from '../models/SavedFilter';
import UserSetModel, { IUserSetsInput, IUserSetsOutput } from '../models/UserSets';
import { Op } from 'sequelize';
import createHttpError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

const sanitizeInputPayload = (payload: IUserSetsInput) => {
    const { id, keycloak_id, creation_date, ...rest } = payload;
    return rest;
};

export const getById = async (keycloak_id: string, id: string): Promise<IUserSetsOutput> => {
    const filter = await UserSetModel.findOne({
        where: {
            [Op.and]: [{ keycloak_id }, { id }],
        },
    });

    if (!filter) {
        throw createHttpError(StatusCodes.NOT_FOUND, `Saved filter #${id} does not exist.`);
    }

    return filter;
};

export const getAll = async (keycloak_id: string): Promise<IUserSetsOutput[]> => {
    return await UserSetModel.findAll({
        where: { keycloak_id },
    });
};

export const create = async (keycloak_id: string, payload: IUserSetsInput): Promise<IUserSetsOutput> => {
    return await UserSetModel.create({
        ...payload,
        keycloak_id,
    });
};

export const update = async (keycloak_id: string, id: string, payload: IUserSetsInput): Promise<IUserSetsOutput> => {
    const results = await UserSetModel.update(
        {
            ...sanitizeInputPayload(payload),
            updated_date: new Date(),
        },
        {
            where: {
                [Op.and]: [{ keycloak_id }, { id }],
            },
            returning: true,
        },
    );

    return results[1][0];
};

export const destroy = async (keycloak_id: string, id: string): Promise<boolean> => {
    console.log(keycloak_id, 'keycloak_id')
    console.log(id, 'id')
    const deletedCount = await UserSetModel.destroy({
        where: { [Op.and]: [{ keycloak_id }, { id }] },
    });
    return !!deletedCount;
};
