import { Router } from 'express'
import {
  createBio,
  getBios,
  getBioById,
  getBioByusername,
  addToFavorite,
  getFavorites,
  checkFavorite,
  removeFavorite,
  getFeatureds,
  setField,
  checkField,
  getBioByToken,
  makeRequest,
  getRequest,
  getUsername,
  getUsernameById
} from '../controllers/post.js'
import auth from '../middlewares/auth.js'
import adminAuth from '../middlewares/adminAuth.js'
const router = Router()

// Biodata CRUD operations
router.get('/home/:type/:jilla', getBios)
router.get('/bio/:id', getBioById)
router.get('/bio-user/:user', getBioByusername)
router.get('/getusername/:id', getUsername)
router.get('/getusername-byid/:id', getUsernameById)
router.post('/createorupdate-biodata', auth, createBio)
router.post('/update-biodata')
router.post('/delete-biodata')
router.get('/set-field/:num', auth, setField)
router.get('/check-field', auth, checkField)
router.get('/getbio-by-token', auth, getBioByToken)

// Biodata feturing options
router.get('/get-featureds', getFeatureds)

// Biodata bookmarking options
router.get('/favorites', auth, getFavorites)
router.get('/post-favorites/:bioid', auth, addToFavorite)
router.get('/is-favorite/:bioid', auth, checkFavorite)
router.delete('/delete-favorites/:bioid', auth, removeFavorite)

// Bio info request options
router.post('/request-info', makeRequest)
router.post('/get-request', adminAuth, getRequest)

export default router
