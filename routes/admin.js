const express = require('express')
const router = express.Router()
const {
  acceptRequest,
  deleteBio,
  deleteBioById,
  deleteFeature,
  deleteRequest,
  getAllBio,
  getBioById,
  getDeleteRequests,
  getRequest,
  getRequestedBio,
  hideBio,
  hideBioById,
  makeFeature,
  publishBio,
  signinadmin,
  signupadmin
} = require('../controllers/admin.js')

const adminAuth = require('../middlewares/adminAuth.js')

// auth
router.post('/sign-in', signinadmin)
router.post('/sign-up', adminAuth, signupadmin)

// bio operations
router.get('/all-bio', adminAuth, getAllBio)
router.get('/bio/:id', adminAuth, getBioById)
router.get('/edit-requests', adminAuth, getRequestedBio)

// delete or hide
router.get('/get-delete-requests', adminAuth, getDeleteRequests)
router.get('/hide-bio/:id', adminAuth, hideBio)
router.get('/hide-bio-id/:id/:reqId', adminAuth, hideBioById)
router.post('/delete-bio', adminAuth, deleteBio)
router.delete('/delete-bio-id/:id/:reqId', adminAuth, deleteBioById)
router.get('/publish-bio/:id', adminAuth, publishBio)

// bio featuring options
router.get('/make-feature/:id', adminAuth, makeFeature)
router.get('/delete-feature/:id', adminAuth, deleteFeature)

// info requests
router.get('/get-requests', adminAuth, getRequest)
router.post('/accept-request', adminAuth, acceptRequest)
router.delete('/delete-request/:id', adminAuth, deleteRequest)

module.exports = router
