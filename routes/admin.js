import { Router } from 'express'
import {
  deleteBio,
  deleteFeature,
  getAllBio,
  getBioById,
  getDeleteHideReq,
  getInfoRequests,
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

// delete or hide
router.get('/get-delete-hide', adminAuth, getDeleteHideReq)
router.get('/hide-bio/:id', adminAuth, hideBio)
router.delete('/delete-bio/:id', adminAuth, deleteBio)
router.get('/publish-bio/:id', adminAuth, publishBio)

// bio featuring options
router.get('/make-feature/:id', adminAuth, makeFeature)
router.get('/delete-feature/:id', adminAuth, deleteFeature)

// info requests
router.get('/get-info-requests', adminAuth, getInfoRequests)

export default router
