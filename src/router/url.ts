import express from 'express'
const router = express.Router();
import { shortenUrl } from '../controller/url';
import { authMiddleware } from '../middleware/authMiddleware';
router.post("/shorten" , authMiddleware ,shortenUrl);

export default router;