import bio from '../models/bio.js'
import inforequest from '../models/inforequest.js'
import userModel from '../models/user.js'
import published from '../utils/published.js'

// Biodata CRUD handlers
export const createBio = async (req, res) => {
  const user = req.id
  try {
    const response = await bio.findOne({ user })
    if (response) {
      // Update the bio
      const update = await bio.findByIdAndUpdate(response._id, req.body)
      res.status(200).json({ message: 'ok' })
    }
    //  else {
    // Create a new bio
    // const createNew = await bio.create({
    //   ...req.body,
    //   user
    // })
    // const updateUserBio = await userModel.findByIdAndUpdate(user, {
    //   bio: createNew._id
    // })

    //   res.status(200).json({ message: 'ok' })
    // }
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}

export const getBioByUserId = async (req, res) => {
  const user = req.params.id
  try {
    const response = await bio.findOne({ user }).populate('user', 'uId -_id')
    res.status(200).json({ response })
  } catch (error) {
    res.status(404).json({ error, message: error.message })
  }
}

export const getBioByUID = async (req, res) => {
  try {
    const user = await userModel.findOne({ uId: req.params.uId })
    const response = await bio
      .findOne({ user: user._id })
      .populate('user', 'uId -_id')
    res.status(200).json({ response: response ?? null })
  } catch (error) {
    res.status(404).json({ error, message: error.message })
  }
}
export const getUIDbyId = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id)
    console.log('user', user)
    res.status(200).json({ uId: user.uId })
  } catch (error) {
    res.status(404).json({ error, message: error.message })
  }
}

export const getBioByToken = async (req, res) => {
  const user = req.id
  try {
    const response = await bio.findOne({ user })
    res.status(200).json({ bio: response })
  } catch (error) {
    res.status(404).json({ error, message: error.message })
  }
}

export const getBios = async (req, res) => {
  const { type, jilla } = req.params
  let published = []
  try {
    // criteria TYPE
    if (type !== 'all' && jilla === 'all') {
      const response = await bio.find({ type }).populate('user', 'uId -_id')

      if (response.length > 0) {
        published = response.filter(item => item.published === true)
      }
      res.status(200).json({ response: response ? published : null })
    } else if (jilla !== 'all' && type === 'all') {
      // criteria JILLA
      const response = await bio
        .find({ permanent_jilla: jilla })
        .populate('user', 'uId -_id')

      if (response.length > 0) {
        published = response.filter(item => item.published === true)
      }
      res.status(200).json({ response: response ? published : null })
    } else if (type === 'all' && jilla === 'all') {
      // no criteria
      const response = await bio.find().populate('user', 'uId -_id')
      if (response.length > 0) {
        published = response.filter(item => item.published === true)
      }
      res.status(200).json({ response: response ? published : null })
    } else {
      // criteria both TYPE & JILLA
      const response = await bio
        .find({ type, permanent_jilla: jilla })
        .populate('user', 'uId -_id')

      if (response.length > 0) {
        published = response.filter(item => item.published === true)
      }
      res.status(200).json({ response: response ? published : null })
    }
  } catch (error) {
    res.status(404).json({ error, message: error.message })
  }
}

export const filterBios = async (req, res) => {
  const { condition, jilla, education, madhab, type } = req.body
  try {
    if (jilla === 'all') {
      const data = await bio
        .find({ condition, education, madhab, type })
        .populate('user', 'uId -_id')

      const response = await published(data)

      res.status(200).json({ response })
    }
  } catch (error) {
    res.status(404).json({ error, message: error.message })
  }
}

export const getFeatureds = async (req, res) => {
  try {
    const response = await bio
      .find({ featured: true })
      .populate('user', 'uId -_id')
    res.status(200).json({ bios: response ?? null })
  } catch (error) {
    res.status(404).json({ message: error.message, error })
  }
}

// custom methods
function getMethod(num) {
  let _method
  switch (num) {
    case '0':
      _method = {
        $set: {
          'fields.0.complete': true
        }
      }
      break
    case '1':
      _method = {
        $set: {
          'fields.1.complete': true
        }
      }
      break
    case '2':
      _method = {
        $set: {
          'fields.2.complete': true
        }
      }
      break
    case '3':
      _method = {
        $set: {
          'fields.3.complete': true
        }
      }
      break
    case '4':
      _method = {
        $set: {
          'fields.4.complete': true
        }
      }
      break
    case '5':
      _method = {
        $set: {
          'fields.5.complete': true
        }
      }
      break
    case '6':
      _method = {
        $set: {
          'fields.6.complete': true
        }
      }
      break
    case '7':
      _method = {
        $set: {
          'fields.7.complete': true
        }
      }
      break
    case '8':
      _method = {
        $set: {
          'fields.8.complete': true
        }
      }
      break
    case '9':
      _method = {
        $set: {
          'fields.9.complete': true
        }
      }
      break
    default:
      return _method
  }
  return _method
}

export const setField = async (req, res) => {
  const id = req.id
  const num = req.params.num
  let method = getMethod(num)
  try {
    const response = await userModel.findByIdAndUpdate(id, method)
    res.status(200).json({ message: 'ok' })
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}

export const checkField = async (req, res) => {
  const id = req.id
  try {
    const fieldResponse = await userModel.findById(id)
    const fields = fieldResponse.fields.filter(item => item.complete == false)
    res.status(200).json({ fields })
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}

// Biodata bookmarking handlers
export const getFavorites = async (req, res) => {
  const id = req.id
  try {
    const data = await userModel
      .findById(id)
      .populate('bookmarks', 'type birth condition profession user')

    res.status(200).json({ bios: data.bookmarks })
  } catch (error) {
    res.status(404).json({ message: 'No bookmarks' })
  }
}

export const addToFavorite = async (req, res) => {
  const { bioid } = req.params
  const _id = req.id

  if (!_id) return res.status(401).json({ message: 'UnAuthorized' })

  try {
    const pushToUser = await userModel.updateOne(
      { _id },
      {
        $push: {
          bookmarks: bioid
        }
      }
    )
    const pushToBio = await bio.updateOne(
      { _id: bioid },
      {
        $push: {
          bookmarks: _id
        }
      }
    )
    res.status(200).json({ message: 'ok' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to bookmark' })
  }
}

export const checkFavorite = async (req, res) => {
  const id = req.id
  const bioid = req.params.bioid

  try {
    const user = await userModel.findById(id)
    if (user.bookmarks.includes(bioid)) {
      res.status(200).json({ message: 'exists' })
    } else {
      res.status(200).json({ message: 'Not exists' })
    }
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}

export const removeFavorite = async (req, res) => {
  const { bioid } = req.params
  const _id = req.id

  try {
    const response = await userModel.findByIdAndUpdate(_id, {
      $pull: {
        bookmarks: bioid
      }
    })
    res.status(200).json({ message: 'ok' })
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}

// Info request options
export const makeRequest = async (req, res) => {
  try {
    const response = await inforequest.create(req.body)
    res.status(200).json({ message: 'ok' })
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}
