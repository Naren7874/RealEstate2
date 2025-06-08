import express from 'express'
import { shouldBeAdmin, shouldBeLoggedIn } from '../controller/test.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
const router = express.Router();

//call verifyToken then other function
router.get("/should-be-logged-in",verifyToken,shouldBeLoggedIn);
router.get("/should-be-admin",verifyToken,shouldBeAdmin);

export default router;