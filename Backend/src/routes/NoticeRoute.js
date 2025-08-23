import express from 'express';
import {
  getNotices,
  createNotice,
  updateNotice,
  deleteNotice
} from '../controller/NoticeController.js';

const router = express.Router();

router.get('/', getNotices);
router.post('/', createNotice);
router.put('/:id', updateNotice);
router.delete('/:id', deleteNotice);

export default router;