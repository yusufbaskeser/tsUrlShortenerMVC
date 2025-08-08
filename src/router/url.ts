import express from 'express'
const router = express.Router();
import { shortenUrl , redirectUrl } from '../controller/url';
import { authMiddleware } from '../middleware/authMiddleware';
router.post("/shorten" , authMiddleware ,shortenUrl);
router.get("/:shortUrl" , redirectUrl);

export default router;