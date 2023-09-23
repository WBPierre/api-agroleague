import { Request, Response, NextFunction } from 'express';
import {UserModel} from "../models";
import {verifyToken} from "../utils/tokenUtils";


const isUserAuthenticated = (accessRole: string = 'user') => {
    return async (req: Request, res: Response, next: NextFunction) => {

        const user = verifyToken(req);

        if (user === null || typeof user === "string") {
            return res.status(403).send("You must be connected");
        }

        const current: any = await UserModel.findOne({
            where: {
                id: user.id,
                email: user.email
            }
        });

        if (!current) {
            return res.status(403).end();
        }

        req.user = {
            ...current.toJSON(),
        }

        next();
    }
}

export default isUserAuthenticated;
