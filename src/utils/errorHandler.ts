import { Prisma } from '@prisma/client';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { z } from 'zod';

function errorHandler(err: any) {
    if (err instanceof z.ZodError) {
        const errMessage = {
            message: err.flatten(),
            status: 400
        };
        return errMessage;
    } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
        const errMessage = {
            message: err.message,
            status: 500
        };
        return errMessage;
    } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
        const errMessage = {
            message: err.message,
            status: 500
        };
        return errMessage;
    } else if (err instanceof Prisma.PrismaClientRustPanicError) {
        const errMessage = {
            message: err.message,
            status: 500
        };
        return errMessage;
    } else if (err instanceof Prisma.PrismaClientInitializationError) {
        const errMessage = {
            message: err.message,
            status: 500
        };
        return errMessage;
    } else if (err instanceof Prisma.PrismaClientValidationError) {
        const errMessage = {
            message: err.message,
            status: 500
        };
        return errMessage;
    } else if (err instanceof JsonWebTokenError) {
        const errMessage = {
            message: err.message,
            status: 401
        };
        return errMessage;
    } else if (err instanceof TokenExpiredError) {
        const errMessage = {
            message: err.message,
            status: 401
        };
        return errMessage;
    } else {
        const errMessage = {
            message: err.message,
            status: 500
        };
        return errMessage;
    }
}

export default errorHandler;
