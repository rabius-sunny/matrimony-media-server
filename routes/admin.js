import { Router } from 'express'
import {
  deleteBio,
  deleteFeature,
  getAllBio,
  getBioById,
  getRequestedBio,
  hideBio,
  makeFeature,
  publishBio,
  signinadmin,
  signupadmin
} from '../controllers/admin.js'
import adminAuth from '../middlewares/adminAuth.js'

const router = Router()

// auth
router.post('/sign-in', signinadmin)
router.post('/sign-up', adminAuth, signupadmin)

// bio operations
router.get('/all-bio', adminAuth, getAllBio)
router.get('/bio/:id', adminAuth, getBioById)
router.get('/edit-requests', adminAuth, getRequestedBio)

router.get('/publish-bio/:id', adminAuth, publishBio)
router.get('/hide-bio/:id', adminAuth, hideBio)
router.delete('/delete-bio/:id', adminAuth, deleteBio)

// bio featuring options
router.get('/make-feature/:id', adminAuth, makeFeature)
router.get('/delete-feature/:id', adminAuth, deleteFeature)

export default router
