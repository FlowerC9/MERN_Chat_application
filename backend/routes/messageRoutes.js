import express from 'express'
import { Router } from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { sendMessage } from '../controllers/messageControllers.js';
import { allMessages } from '../controllers/messageControllers.js';
const router = Router();

router.route('/').post(protect, sendMessage)
router.route('/:chatId').get(protect, allMessages)

export default router;