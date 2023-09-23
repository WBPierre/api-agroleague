import {format} from "date-fns";
import {Express, Request, Response, NextFunction} from "express";
import getDurationInMilliseconds from "../src/utils/parserUtils";

export default function(server: Express):void {

    server.use( function(req: Request, res: Response, next: NextFunction) {

        const start: number[] = process.hrtime();
        const requestUrl: string = req.url;

        res.on('finish', () => {
            const duration: number = getDurationInMilliseconds(start);
            const request: string = '[' + req.method + ' ' + res.statusCode + ` ${Math.trunc(res.statusCode/100) !== 4 ? '✅' : '❌'}` + ' | ' + format(new Date(), "dd/MM/yyyy hh:MM:ss") + '] Request : ' + requestUrl + ' ' + duration.toLocaleString() + ' ms';
            console.log(request);
        });

        next();
    })
}

