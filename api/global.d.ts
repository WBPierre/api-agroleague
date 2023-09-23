import {UserType} from "./src/types/UserType";

declare global {
    var __basedir: string;
    namespace Express {
        export interface Request {
            user?: UserType
        }
    }

}

export {};