import express  from "express";
const router = express.Router();

import { singleStory } from "../controllers/SingleStory.js"
import { saveFavoriteCode , deleteSaveFavoriteCode , allFavoriteCode , isCodeSaved} from "../controllers/FavoriteCodeController.js";
import {authenticateUser} from "../midleware/authMidleware.js";

router.post("/addToFavorite" , authenticateUser ,  saveFavoriteCode);
router.post("/removeFromFavorite" , authenticateUser ,  deleteSaveFavoriteCode);
router.get("/allFavoriteStories" , authenticateUser , allFavoriteCode);
router.get("/isSaved/:codeId" , authenticateUser , isCodeSaved);
router.get("/singleStory/:storyId" , authenticateUser , singleStory);

export default router;