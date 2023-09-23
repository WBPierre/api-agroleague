import express, {Router} from "express";
import isUserAuthenticated from "../middlewares/authentification.middleware";
import {verifyToken} from "../utils/tokenUtils";
import {
    getConversation,
    getConversations,
    sendMessage,
    updateConversation
} from "../controllers/ConversationController";

const router: Router = express.Router();

router.get('/', [isUserAuthenticated()], getConversations);
router.get('/:id', [isUserAuthenticated()], getConversation);
router.post('/', [isUserAuthenticated()], sendMessage);
router.put('/:id', [isUserAuthenticated()], updateConversation);

export { router as ConversationRoutes };
