import { Router } from "express";
import { getStartGame, postGuessGame } from "../controllers/game.controllers.js"

const router = Router();

// Routes with controllers to assist with routing logic
router.get("/start", getStartGame);
router.post("/guess", postGuessGame);

export default router