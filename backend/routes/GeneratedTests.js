import express from "express";
const router = express.Router();



import { fetchAllGeneratedStories } from "../controllers/FetchCodeController.js";
import {authenticateUser} from "../midleware/authMidleware.js";


router.get("/allGeneratedStories" , authenticateUser , fetchAllGeneratedStories);


export default router;