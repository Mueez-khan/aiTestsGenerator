import express from "express";
import { generateCode } from "../controllers/generateTest.js";
import { authenticateUser } from "../midleware/authMidleware.js";

const router = express.Router();

router.post("/generateStory", authenticateUser, generateCode);

export default router;