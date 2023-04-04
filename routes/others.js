const {
  deleteMessage,
  deleteReport,
  getMessage,
  getReport,
  makeReport,
  postMessage
} = require('../controllers/others.js')
const auth = require('../middlewares/auth.js')
const adminAuth = require('../middlewares/adminAuth.js')

const express = require('express')
const router = express.Router()

router.post('/make-report', auth, makeReport)
router.get('/reports', adminAuth, getReport)
router.delete('/report/:id', adminAuth, deleteReport)
router.post('/post-message', postMessage)
router.get('/admin/get-messages', adminAuth, getMessage)
router.delete('/admin/delete-message/:id', adminAuth, deleteMessage)
module.exports = router
