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
  checkField
} from '../controllers/post.js'
import auth from '../middlewares/auth.js'
const router = Router()

// Biodata CRUD operations
router.get('/home/:type/:jilla', getBios)
router.get('/bio/:id', getBioById)
router.get('/bio-user/:user', getBioByusername)
router.post('/createorupdate-biodata', auth, createBio)
router.post('/update-biodata')
router.post('/delete-biodata')
router.get('/set-field/:num', auth, setField)
router.get('/check-field', auth, checkField)

// Biodata feturing options
router.get('/get-featureds', getFeatureds)

// Biodata bookmarking options
router.get('/favorites', auth, getFavorites)
router.get('/post-favorites/:bioid', auth, addToFavorite)
router.get('/is-favorite/:bioid', auth, checkFavorite)
router.delete('/delete-favorites/:bioid', auth, removeFavorite)

export default router
