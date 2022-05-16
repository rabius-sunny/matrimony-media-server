import { Router } from 'express'
import auth from '../middlewares/auth.js'
import { getType, getUser, signup } from '../controllers/user.js'
const router = Router()

router.post('/sign-in', signup)
router.get('/get-user', auth, getUser)
router.get('/get-type', auth, getType)

export default router
