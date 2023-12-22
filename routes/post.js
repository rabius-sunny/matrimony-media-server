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
  checkField,
  getBioByToken,
  makeRequest,
  getUIDbyId,
  filterBios,
  hideBioByUser,
  getFavoritesFromIds,
  getSpecificData
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
router.get('/check-field', auth, checkField)
router.get('/getbio-by-token', auth, getBioByToken)
router.get('/get-specific-data/:key', auth, getSpecificData)
router.get('/hide-by-user', auth, hideBioByUser)

// Biodata feturing options
router.get('/get-featureds', getFeatureds)

// Biodata bookmarking options
router.get('/favorites', auth, getFavorites)
router.post('/favorites', auth, getFavoritesFromIds)
router.get('/post-favorites/:bioid', auth, addToFavorite)
router.get('/is-favorite/:bioid', auth, checkFavorite)
router.delete('/delete-favorites/:bioid', auth, removeFavorite)

// Bio info request options
router.post('/request-info', makeRequest)

module.exports = router
