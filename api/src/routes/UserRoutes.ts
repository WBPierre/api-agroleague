import express, {Request, Response, Router} from "express";
import isUserAuthenticated from "../middlewares/authentification.middleware";
import {createUser, getUser, getUsers, updatePassword, updateUser} from "../controllers/UserController";

const router: Router = express.Router();

router.get('/', [isUserAuthenticated()], getUsers);
router.get('/:id', [isUserAuthenticated()], getUser);
router.post('/', [isUserAuthenticated()], createUser);
router.put('/', [isUserAuthenticated()], updateUser);
router.put('/password', [isUserAuthenticated()], updatePassword);

export { router as UserRoutes };
