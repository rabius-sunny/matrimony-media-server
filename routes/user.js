import { Router } from 'express'
import auth from '../middlewares/auth.js'
import user from '../controllers/user.js'
const router = Router()

router.post('/sign-in', user)

export default router
