import express from 'express'
const router = express.Router();
import { getMyUrls , listUrls } from '../controller/user';
import { authMiddleware } from '../middleware/authMiddleware';
router.get("/myurls" , authMiddleware , getMyUrls);
router.get("/list" , listUrls);

export default router;