import express, {Request, Response, Router} from "express";
import {server} from "../../config/server";

const router: Router = express.Router();

router.get('/', (req : Request, res: Response) => {
    res.send('Server is healthy');
});

export { router as healthRoutes };
