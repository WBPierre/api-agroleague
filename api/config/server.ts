import http from "http";
import express, {Express, Request, Response, NextFunction} from "express";
import requestParser from "./requestParser";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import Routes from "../src/routes";
import {parseErrors} from "../src/helpers";
import { initDatabase } from "./database";
import {generateData} from "./init/database";

global.__basedir = __dirname;

(async () => {
    if (await initDatabase()) {
        await generateData()
    }
})();

const app: Express = express();

const server = http.createServer(app);

app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
app.use(bodyParser.json({limit: '5mb'}));

app.use(cookieParser());

app.use(cors(
    {
        credentials: true,
        preflightContinue: true,
        origin: ["http://localhost:3000"],
    }));


app.use(express.static('public'));

requestParser(app);

app.use(async (err: Error, req: Request, res: Response, next: NextFunction) => {
    parseErrors(res, {error: err})
})

Routes(app);


export { server };
