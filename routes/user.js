import { Router } from 'express'
import auth from '../middlewares/auth.js'
import {
  requestDeleteHide,
  getType,
  getUser,
  signup,
  getUids
} from '../controllers/user.js'
const router = Router()

router.post('/sign-in', signup)
router.get('/get-user', auth, getUser)
router.get('/get-type', auth, getType)
router.get('/get-uids', getUids)
router.post('/delete-hide-request', auth, requestDeleteHide)

export default router
