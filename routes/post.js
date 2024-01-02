const {
  createBio,
  initialFilter,
  getBioByUserId,
  getBioByUID,
  addToFavorite,
  checkFavorite,
  removeFavorite,
  getFeatureds,
  checkField,
  getBioByToken,
  makeRequest,
  getUIDbyId,
  filterBios,
  hideBioByUser,
  getFavoritesFromuIds,
  getSpecificData,
  requestPublish
} = require('../controllers/post.js')
const auth = require('../middlewares/auth.js')
const express = require('express')
const router = express.Router()

// Biodata CRUD operations
router.post('/initial-filter', initialFilter)
router.post('/filter-bios', filterBios)
router.get('/bio/:id', getBioByUserId)
router.get('/bio-id/:uId', getBioByUID)
router.get('/bio-uId/:id', getUIDbyId)
router.post('/createorupdate-biodata', auth, createBio)
router.get('/request-publish', auth, requestPublish)
router.get('/check-field', auth, checkField)
router.get('/getbio-by-token', auth, getBioByToken)
router.get('/get-specific-data/:key', auth, getSpecificData)
router.get('/hide-by-user', auth, hideBioByUser)

// Biodata feturing options
router.get('/get-featureds', getFeatureds)

// Biodata bookmarking options
router.post('/favorites', auth, getFavoritesFromuIds)
router.get('/post-favorites/:uId', auth, addToFavorite)
router.get('/is-favorite/:uId', auth, checkFavorite)
router.delete('/delete-favorites/:uId', auth, removeFavorite)

// Bio info request options
router.post('/request-info', makeRequest)

module.exports = router
