import { Router } from 'express'
import {
  deleteMessage,
  deleteReport,
  getReport,
  makeReport,
  postMessage
} from '../controllers/others.js'
import auth from '../middlewares/auth.js'
import adminAuth from '../middlewares/adminAuth.js'

const router = Router()

router.post('/make-report', auth, makeReport)
router.get('/reports', adminAuth, getReport)
router.delete('/report/:id', adminAuth, deleteReport)
router.post('/post-message', postMessage)
router.delete('/delete-message/:id', deleteMessage)
export default router
