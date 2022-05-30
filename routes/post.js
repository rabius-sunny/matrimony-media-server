import { Router } from 'express'
import { createBio, getBioById } from '../controllers/post.js'
import auth from '../middlewares/auth.js'
const router = Router()

// Biodata CRUD operations
router.get('/home/:page')
router.get('/bio/:id', getBioById)
router.post('/createorupdate-biodata', auth, createBio)
router.post('/update-biodata')
router.post('/delete-biodata')

// Biodata feturing options
router.get('/featured/')
router.get('/post-featured/:id')
router.get('/delete-featured/:id')

// Biodata bookmarking options
router.get('/post-favorites/:bioid')
router.get('/delete-favorites/:bioid')
router.get('/favorites/:page')

export default router
