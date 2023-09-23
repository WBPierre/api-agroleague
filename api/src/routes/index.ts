import {Express, Router} from "express";
import {healthRoutes} from './HealthRoutes';
import {UserRoutes} from "./UserRoutes";
import {AuthRoutes} from "./AuthRoutes";
import {ConversationRoutes} from "./ConversationRoutes";


export default (app: Express): void => {
    const router: Router = Router();

    router.use("/health", healthRoutes);
    router.use("/users", UserRoutes);
    router.use("/auth", AuthRoutes);
    router.use("/conversations", ConversationRoutes);

    app.use('/api', router);
}
