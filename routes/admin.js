import { Router } from 'express'
import { signinadmin, signupadmin } from '../controllers/admin.js'
import adminAuth from '../middlewares/adminAuth.js'

const router = Router()

router.post('/sign-in', signinadmin)
router.post('/sign-up', adminAuth, signupadmin)

export default router
