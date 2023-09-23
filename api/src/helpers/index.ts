import {Response, Request} from "express";

import {errors} from "../../config/errors/errors";

import jwt, {JwtPayload} from "jsonwebtoken";

type ErrorParams = {
    error?: any;
    httpCode?: number;
    message?: string;
};

export const parseErrors = (res: Response, params: ErrorParams = {}) =>  {
    const p = {
        error: null,
        httpCode: 400,
        message: 'Une erreur est survenue',
        ...params,
    };

    if (p.error == null) {
        return res.status(p.httpCode).json({
            type: 'manual',
            errors: [{ message: p.message }],
        });
    }

    let formatted = { type: p.error.name, errors: [] };

    switch (p.error.name) {
        case 'SequelizeUniqueConstraintError':
        case 'SequelizeValidationError':
            formatted = {
                ...formatted,
                errors: p.error.errors.map((item: any) => { // Specify exact error type if possible.
                    return {
                        path: item.path,
                        message: item.message,
                        value: item.value,
                    };
                }),
            };
            break;
        case 'TypeError':
            console.log({
                level: 'error',
                message: `Dev type error : ${p.error.toString()}`,
            });
            return res.status(p.httpCode).json({
                type: 'manual',
                errors: [{ message: errors?.dev?.typeError }],
            });
        case 'ValidationError':
            formatted = {
                ...formatted,
                // @ts-ignore
                errors: Object.entries(p.error.errors).map((item: any[]) => { // Specify exact error type if possible.
                    return {
                        path: item[1].properties.path,
                        message: item[1].properties.message,
                        value: item[1].properties.value,
                    };
                }),
            };
            break;
        case 'JsonWebTokenError':
            return res.status(p.httpCode).json({
                type: 'manual',
                errors: [{ message: errors?.jwt?.expired }],
            });
        default:
            console.log({
                level: 'error',
                message: `Missing error : ${p.error.toString()}`,
            });
            formatted = {
                type: 'manual',
                // @ts-ignore
                errors: [{ message: errors?.dev?.missingError }],
            };
            break;
    }
    return res.status(p.httpCode).json(formatted);

};