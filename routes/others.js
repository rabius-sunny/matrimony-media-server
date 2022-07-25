import { Router } from 'express'
import { deleteReport, getReport, makeReport } from '../controllers/others.js'
import auth from '../middlewares/auth.js'
import adminAuth from '../middlewares/adminAuth.js'

const router = Router()

router.post('/make-report', auth, makeReport)
router.get('/reports', adminAuth, getReport)
router.delete('/report/:id', adminAuth, deleteReport)
export default router
