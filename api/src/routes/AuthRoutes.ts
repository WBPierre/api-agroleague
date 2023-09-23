import express, {Router} from "express";
import isUserAuthenticated from "../middlewares/authentification.middleware";
import {login, verifyUser} from "../controllers/AuthController";
import {verifyToken} from "../utils/tokenUtils";

const router: Router = express.Router();

router.get('/', [isUserAuthenticated()], verifyUser);
router.post('/', login);

export { router as AuthRoutes };
