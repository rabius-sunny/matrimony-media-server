const {
  createBio,
  getBios,
  getBioByUserId,
  getBioByUID,
  addToFavorite,
  getFavorites,
  checkFavorite,
  removeFavorite,
  getFeatureds,
  setField,
  checkField,
  getBioByToken,
  makeRequest,
  getUIDbyId,
  filterBios,
  hideBioByUser
} = require('../controllers/post.js')
const auth = require('../middlewares/auth.js')
const express = require('express')
const router = express.Router()

// Biodata CRUD operations
router.get('/home/:type/:jilla', getBios)
router.post('/filter-bios', filterBios)
router.get('/bio/:id', getBioByUserId)
router.get('/bio-id/:uId', getBioByUID)
router.get('/bio-uId/:id', getUIDbyId)
router.post('/createorupdate-biodata', auth, createBio)
router.get('/set-field/:num', auth, setField)
router.get('/check-field', auth, checkField)
router.get('/getbio-by-token', auth, getBioByToken)
router.get('/hide-by-user', auth, hideBioByUser)

// Biodata feturing options
router.get('/get-featureds', getFeatureds)

// Biodata bookmarking options
router.get('/favorites', auth, getFavorites)
router.get('/post-favorites/:bioid', auth, addToFavorite)
router.get('/is-favorite/:bioid', auth, checkFavorite)
router.delete('/delete-favorites/:bioid', auth, removeFavorite)

// Bio info request options
router.post('/request-info', makeRequest)

module.exports = router
