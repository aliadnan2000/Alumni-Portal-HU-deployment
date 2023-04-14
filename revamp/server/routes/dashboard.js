import express from "express";
import auth from "../middleware/auth.js";

import {get} from '../controllers/dashboard.js';
const router = express.Router();

router.get("/", auth, get);

export default router;