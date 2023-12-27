const bio = require('../models/bio.js')
const inforequest = require('../models/inforequest.js')
const userModel = require('../models/user.js')
const projections = require('../static/projection.js')
const { getSelection } = require('../static/selection.js')
const { filterEmptyProperties } = require('../utils/filterEmptyObject.js')
const {
  marriageFields,
  generalFields,
  madrasaFields,
  formRoutes,
  getFilled,
  getUnfilled
} = require('../static/fields.js')
const getGroupData = require('../utils/getGroupData.js')

// Biodata CRUD handlers

const createBio = async (req, res) => {
  const user = req.id
  const { key, ...rest } = req.body
  try {
    const userbio = await bio.findOne({ user })
    if (key === 'primary') {
      if (rest.education !== userbio.education) {
        await bio.findOneAndUpdate(
          { user },
          {
            ...rest,
            ...generalFields,
            ...madrasaFields,
            published: false,
            featured: false
          }
        )
        await userModel.findByIdAndUpdate(user, {
          $set: { [`fields.primary`]: true, [`fields.education`]: false }
        })
      }
      if (rest.type !== userbio.type || rest.condition !== userbio.condition) {
        await bio.findOneAndUpdate(
          { user },
          { ...rest, ...marriageFields, published: false, featured: false }
        )
        await userModel.findByIdAndUpdate(user, {
          $set: { [`fields.primary`]: true, [`fields.marriage`]: false }
        })
      }
      await bio.findOneAndUpdate(
        { user },
        { ...rest, published: false, featured: false }
      )
      await userModel.findByIdAndUpdate(user, {
        $set: { [`fields.primary`]: true }
      })
    } else {
      await bio.findOneAndUpdate(
        { user },
        { ...rest, published: false, featured: false }
      )
      await userModel.findByIdAndUpdate(user, {
        $set: { [`fields.${key}`]: true }
      })
    }
    res.status(200).json({ message: 'ok' })
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}

const requestPublish = async (req, res) => {
  const user = req.id
  try {
    await bio.findOneAndUpdate(
      { user },
      { requested: true, published: false, featured: false }
    )
    res.status(200).json({ message: 'ok' })
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}

const getBioByUserId = async (req, res) => {
  const user = req.params.id
  try {
    const response = await bio.findOne({ user }).populate('user', 'uId')
    // .select('guardian_number number_relation receiving_email -_id')
    const trimed = filterEmptyProperties(response.toObject())
    res.status(200).json({ response: trimed })
  } catch (error) {
    res.status(404).json({ error, message: error.message })
  }
}

const getBioByUID = async (req, res) => {
  try {
    const user = await userModel.findOne({ uId: req.params.uId })
    const response = await bio
      .findOne({ user: user._id, published: true }, projections)
      .populate('user', 'uId -_id')
    res.status(200).json({ response: response ?? null })
  } catch (error) {
    res.status(404).json({ error, message: error.message })
  }
}
const getUIDbyId = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id)
    res.status(200).json({ uId: user.uId })
  } catch (error) {
    res.status(404).json({ error, message: error.message })
  }
}

const getBioByToken = async (req, res) => {
  const user = req.id
  try {
    const data = await bio.findOne({ user }, projections)
    const userdata = await userModel.findById(user)
    const unfilled = getUnfilled(userdata.toObject())
    const response = getGroupData(data.toObject())
    res.status(200).json({ bio: response, unfilled })
  } catch (error) {
    res.status(404).json({ error, message: error.message })
  }
}
const getSpecificData = async (req, res) => {
  const user = req.id
  const selectionString = getSelection(req.params.key)
  try {
    const biodata = await bio
      .findOne({ user })
      .select(selectionString)
      .populate('user', 'uId -_id')
    const userdata = await userModel.findById(user)
    const filled = getFilled(userdata.toObject())
    const unfilled = getUnfilled(userdata.toObject())

    const filteredData = filterEmptyProperties(biodata.toObject())
    res.status(200).json({
      bio: filteredData,
      filled,
      unfilled: req.params.key === 'contact' ? unfilled : null
    })
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}

const getBios = async (req, res) => {
  const { type, jilla } = req.params
  try {
    // criteria TYPE
    if (type !== 'all' && jilla === 'all') {
      const response = await bio
        .find({ type, published: true }, projections)
        .populate('user', 'uId -_id')
      res.status(200).json({ response: response ?? null })
    } else if (jilla !== 'all' && type === 'all') {
      // criteria JILLA
      const response = await bio
        .find({ permanent_jilla: jilla, published: true }, projections)
        .populate('user', 'uId -_id')
      res.status(200).json({ response: response ?? null })
    } else if (type === 'all' && jilla === 'all') {
      // no criteria
      const response = await bio
        .find({ published: true }, projections)
        .populate('user', 'uId -_id')
      res.status(200).json({ response: response ?? null })
    } else {
      // criteria both TYPE & JILLA
      const response = await bio
        .find({ type, permanent_jilla: jilla, published: true }, projections)
        .populate('user', 'uId -_id')
      res.status(200).json({ response: response ?? null })
    }
  } catch (error) {
    res.status(404).json({ error, message: error.message })
  }
}

const filterBios = async (req, res) => {
  try {
    const response = await bio
      .find({ ...req.body, published: true }, projections)
      .populate('user', 'uId -_id')

    res.status(200).json({ response })
  } catch (error) {
    res.status(404).json({ error, message: error.message })
  }
}

const getFeatureds = async (req, res) => {
  try {
    const response = await bio
      .find({ featured: true, published: true }, projections)
      .populate('user', 'uId -_id')
    res.status(200).json({ bios: response ?? null })
  } catch (error) {
    res.status(404).json({ message: error.message, error })
  }
}

const hideBioByUser = async (req, res) => {
  const id = req.id
  try {
    const response = await bio.findOneAndUpdate(
      { user: id },
      {
        published: false
      }
    )
    res.status(200).json({ message: 'ok' })
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}

const checkField = async (req, res) => {
  const id = req.id
  try {
    const user = await userModel.findById(id)
    const unfilled = Object.keys(user.fields).filter(
      (item) => !user.fields[item]
    )
    const fields = unfilled.map((item) => formRoutes[item])
    res.status(200).json({ fields })
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}

// Biodata bookmarking handlers
const getFavorites = async (req, res) => {
  const id = req.id
  try {
    const data = await userModel
      .findById(id)
      .populate('bookmarks', 'type birth condition profession user -_id')

    res.status(200).json({ bios: data.bookmarks })
  } catch (error) {
    res.status(404).json({ message: 'No bookmarks' })
  }
}

// Get bookmarks by array of bio ids
const getFavoritesFromIds = async (req, res) => {
  const uIds = req.body.uIds

  try {
    const user = await userModel
      .find({ uId: { $in: uIds }, published: true }, { bio: 1, _id: 0 })
      .populate('bio', 'type condition birth profession user')
    res.status(200).json({ response: user })
  } catch (error) {
    res.status(404).json({ error, message: error.message })
  }
}

const addToFavorite = async (req, res) => {
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

const checkFavorite = async (req, res) => {
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

const removeFavorite = async (req, res) => {
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
const makeRequest = async (req, res) => {
  try {
    const response = await inforequest.create(req.body)
    res.status(200).json({ message: 'ok' })
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}

module.exports = {
  createBio,
  requestPublish,
  getBioByUserId,
  getBioByUID,
  getUIDbyId,
  getBioByToken,
  getSpecificData,
  getBios,
  filterBios,
  getFeatureds,
  hideBioByUser,
  checkField,
  getFavorites,
  getFavoritesFromIds,
  addToFavorite,
  checkFavorite,
  removeFavorite,
  makeRequest
}
