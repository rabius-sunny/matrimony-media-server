import { Router } from 'express'
import { createBio } from '../controllers/post.js'
import auth from '../middlewares/auth.js'
const router = Router()

router.get('/home/:page')
router.post('/create-biodata', auth, createBio)
router.post('/update-biodata')
router.get('/delete-biodata/:id')

router.get('/featured/')
router.get('/post-featured/:id')
router.get('/delete-featured/:id')

router.get('/post-favorites/:id/:bioid')
router.get('/delete-favorites/:id/:bioid')
router.get('/favorites/:id/:page')

export default router
