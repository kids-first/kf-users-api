import { NextFunction, Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { DatabaseError } from 'pg';
import { HttpError } from 'http-errors';

enum DATABASE_ERROR_CODES {
    UNIQUE_VIOLATION = '23505',
}

export const globalErrorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction): void => {
    if (err instanceof DatabaseError && err.code == DATABASE_ERROR_CODES.UNIQUE_VIOLATION) {
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            error: 'A resource with the same id already exists.',
        });
    } else if (err instanceof HttpError) {
        res.status(err.status).json({
            error: err.message,
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
