const bio = require('../models/bio.js')
const inforequest = require('../models/inforequest.js')
const userModel = require('../models/user.js')
const { projections, getProjections } = require('../static/projection.js')
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
const { successRes, errorRes } = require('../static/static-response.js')

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

const getBioByToken = async (req, res) => {
  const user = req.id
  try {
    const data = await bio.findOne({ user }, getProjections(['requested']))
    const userdata = await userModel.findById(user)
    const unfilled = getUnfilled(userdata.toObject())
    const biodata = getGroupData(data.toObject())
    res.status(200).json({
      bio: biodata,
      uId: userdata.uId,
      unfilled,
      requested: data.requested ?? 'no data'
    })
  } catch (error) {
    res.status(404).json({ error, message: error.message })
  }
}

const getBioByUID = async (req, res) => {
  const uId = req.params.uId
  try {
    const user = await userModel.findOne({ uId })
    const data = await bio.findById(user.bio)
    const biodata = getGroupData(data.toObject())
    res.status(200).json({ bio: biodata })
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

const initialFilter = async (req, res) => {
  const filteredCriteria = filterEmptyProperties(req.body)
  const { type, address } = filteredCriteria
  try {
    if (address) {
      const response = await bio
        .find({
          published: true,
          type,
          $or: [
            { permanent_jilla: address },
            { permanent_division: address },
            { current_jilla: address },
            { current_division: address }
          ]
        })
        .select('type condition profession birth -_id')
        .populate('user', 'uId -_id')
      return res.status(200).json({ response })
    }
    const response = await bio
      .find({ type, published: true })
      .select('type condition profession birth -_id')
      .populate('user', 'uId -_id')
    return res.status(200).json({ response })
  } catch (error) {
    res.status(404).json({ error, message: error.message })
  }
}

const filterBios = async (req, res) => {
  const filteredCriteria = filterEmptyProperties(req.body)
  const { condition, type, ageFrom, ageTo, education, madhab, jilla } =
    filteredCriteria

  const conditions = [
    { type },
    { published: true },
    { age: { $gte: ageFrom, $lte: ageTo } }
  ]
  try {
    if (condition) {
      conditions.push({ condition })
    }
    if (education) {
      conditions.push({ education })
    }
    if (madhab) {
      conditions.push({ madhab })
    }
    if (jilla) {
      conditions.push({ permanent_jilla: jilla })
    }
    const bios = await bio
      .find({ $and: conditions })
      .select('type condition profession birth -_id')
      .populate('user', 'uId -_id')

    res.status(200).json({ bios })
  } catch (error) {
    res.status(404).json({ error, message: error.message })
  }
}

const getFeatureds = async (req, res) => {
  try {
    const response = await bio
      .find(
        { featured: true, published: true },
        { type: 1, condition: 1, birth: 1, profession: 1, _id: 0 }
      )
      .populate('user', 'uId -_id')
    // .select('type condition birth profession')
    res.status(200).json({ bios: response })
  } catch (error) {
    res.status(404).json({ message: error.message, error })
  }
}

const hideBioByUser = async (req, res) => {
  const id = req.id
  try {
    await bio.findOneAndUpdate(
      { user: id },
      {
        featured: false,
        published: false
      }
    )
    res.status(200).json(successRes())
  } catch (error) {
    res.status(500).json(errorRes(error))
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

// Favorites
// Get favorites by array of bio uIds
const getFavoritesFromuIds = async (req, res) => {
  const uIds = req.body.uIds

  try {
    const data = await userModel
      .find({ uId: { $in: uIds }, published: true }, { bio: 1, uId: 1, _id: 0 })
      .populate('bio', 'type condition birth profession -_id')
    res.status(200).json(successRes(data))
  } catch (error) {
    res.status(404).json(errorRes(error))
  }
}

const addToFavorite = async (req, res) => {
  const uId = req.params.uId
  const id = req.id
  const userId = req.uId
  try {
    if (!uId) {
      return res
        .status(500)
        .json(errorRes({ message: 'no uId found' }, 'no uId found'))
    }

    await userModel.findByIdAndUpdate(id, { $addToSet: { bookmarks: uId } })
    await userModel.findOneAndUpdate(
      { uId },
      { $addToSet: { bookmarked: userId } }
    )

    res.status(200).json(successRes())
  } catch (error) {
    res.status(500).json(errorRes())
  }
}

const removeFavorite = async (req, res) => {
  const uId = req.params.uId
  const id = req.id
  const userId = req.uId

  try {
    if (!uId) {
      return res
        .status(500)
        .json(errorRes({ message: 'no uId found' }, 'no uId found'))
    }
    await userModel.findByIdAndUpdate(id, { $pull: { bookmarks: uId } })
    await userModel.findOneAndUpdate({ uId }, { $pull: { bookmarked: userId } })

    res.status(200).json(successRes())
  } catch (error) {
    res.status(500).json(errorRes(error))
  }
}

const checkFavorite = async (req, res) => {
  const uId = req.params.uId
  const id = req.id

  try {
    const user = await userModel.findById(id)
    if (user.bookmarks.includes(uId)) {
      res.status(200).json({ message: 'exists' })
    } else {
      res.status(200).json({ message: 'Not exists' })
    }
  } catch (error) {
    res.status(500).json(errorRes(error))
  }
}

// Info request options
const makeRequest = async (req, res) => {
  try {
    await inforequest.create(req.body)
    res.status(200).json(successRes())
  } catch (error) {
    res.status(500).json(errorRes(error))
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
  initialFilter,
  filterBios,
  getFeatureds,
  hideBioByUser,
  checkField,
  getFavoritesFromuIds,
  addToFavorite,
  checkFavorite,
  removeFavorite,
  makeRequest
}
