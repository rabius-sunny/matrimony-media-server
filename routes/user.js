const auth = require('../middlewares/auth.js')
const {
  requestDelete,
  getType,
  getUser,
  signup,
  getUids
} = require('../controllers/user.js')
const express = require('express')
const router = express.Router()

router.post('/sign-in', signup)
router.get('/get-user', auth, getUser)
router.get('/get-type', auth, getType)
router.get('/get-uids', getUids)
router.post('/get-delete-request', auth, requestDelete)

module.exports = router
