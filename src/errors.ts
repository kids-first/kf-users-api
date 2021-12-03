import { NextFunction, Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

export class UserNotFoundError extends Error {
    constructor(keycloak_id: string) {
        super(`User with keycloak id ${keycloak_id} does not exist.`);
        Object.setPrototypeOf(this, UserNotFoundError.prototype);
        this.name = UserNotFoundError.name;
    }
}

export const globalErrorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction): void => {
    if (err instanceof UserNotFoundError) {
        res.status(StatusCodes.NOT_FOUND).json({
            error: getReasonPhrase(StatusCodes.NOT_FOUND),
        });
    } else if (err instanceof Error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        });
    } else {
        throw err;
    }
};

export const globalErrorLogger = (err: unknown, _req: Request, _res: Response, next: NextFunction): void => {
    console.error(err);
    next(err);
};
