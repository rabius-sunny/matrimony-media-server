import bio from '../models/bio.js'
import userModel from '../models/user.js'

// Biodata CRUD handlers
export const createBio = async (req, res) => {
  const user = req.id
  try {
    const response = await bio.findOne({ user })
    if (response) {
      const update = await bio.findByIdAndUpdate(response._id, req.body)
      res.status(200).json({ message: 'ok' })
    } else {
      const createNew = await bio.create({
        ...req.body,
        user
      })
      const updateUserBio = await userModel.findByIdAndUpdate(user, {
        bio: createNew._id
      })

      res.status(200).json({ message: 'ok' })
    }
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}

export const getBioById = async (req, res) => {
  const user = req.params.id
  try {
    const response = await bio.findOne({ user })
    res.status(200).json({ response })
  } catch (error) {
    res.status(404).json({ error, message: error.message })
  }
}

export const getBioByusername = async (req, res) => {
  const _data = req.params.user.split('+')[0]
  const _type = req.params.user.split('+')[1]
  try {
    if (_type === 'username') {
      const user = await userModel.findOne({ username: _data })
      const response = await bio
        .findById(user.bio)
        .populate('user', 'username -_id')
      res.status(200).json({ response: response ?? null })
    } else if (_type === 'id') {
      const response = await bio
        .findById(_data)
        .populate('user', 'username -_id')
      res.status(200).json({ response: response ?? null })
    }
  } catch (error) {
    res.status(404).json({ error, message: error.message })
  }
}

export const getBios = async (req, res) => {
  const { type, jilla } = req.params
  let published = []
  try {
    if (type !== 'all' && jilla === 'all') {
      const response = await bio
        .find({ type })
        .populate('user', 'username -_id')

      if (response.length > 0) {
        published = response.filter(item => item.published === true)
      }
      res.status(200).json({ response: response ? published : null })
    } else if (jilla !== 'all' && type === 'all') {
      const response = await bio
        .find({ permanent_jilla: jilla })
        .populate('user', 'username -_id')

      if (response.length > 0) {
        published = response.filter(item => item.published === true)
      }
      res.status(200).json({ response: response ? published : null })
    } else if (type === 'all' && jilla === 'all') {
      const response = await bio.find().populate('user', 'username -_id')
      if (response.length > 0) {
        published = response.filter(item => item.published === true)
      }
      res.status(200).json({ response: response ? published : null })
    } else {
      const response = await bio
        .find({ type, permanent_jilla: jilla })
        .populate('user', 'username -_id')

      if (response.length > 0) {
        published = response.filter(item => item.published === true)
      }
      res.status(200).json({ response: response ? published : null })
    }
  } catch (error) {
    res.status(404).json({ error, message: error.message })
  }
}

export const getFeatureds = async (req, res) => {
  try {
    const response = await bio
      .find({ featured: true })
      .populate('user', 'username -_id')
    res.status(200).json({ bios: response ?? null })
  } catch (error) {
    res.status(404).json({ message: error.message, error })
  }
}

// Biodata bookmarking handlers
export const getFavorites = async (req, res) => {
  const id = req.id
  try {
    const user = await userModel
      .findById(id)
      .populate('bookmarks', 'type birth condition profession user')

    res.status(200).json({ bios: user.bookmarks })
  } catch (error) {
    res.status(404).json({ message: 'No bookmarks' })
  }
}

export const addToFavorite = async (req, res) => {
  const { bioid } = req.params
  const _id = req.id

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
