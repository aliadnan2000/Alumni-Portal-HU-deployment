import express from "express";

import {signin, signup, fetchUserById} from '../controllers/user.js';
const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/:id', fetchUserById);

export default router;