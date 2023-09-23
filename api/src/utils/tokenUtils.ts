import {Request, Response} from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import {TokenInterface} from "../interfaces/TokenInterface";

export const populateToken = (payload: TokenInterface, res: Response): string => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        algorithm: "HS256",
        expiresIn: 3600 * 24,
    });
}

export const verifyToken = (req: Request): string | JwtPayload | null => {
    let token = req.headers.authorization;

    if (token === undefined) {
        return null;
    }

    token = token.replace("Bearer ", "");

    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        return null;
    }
}
