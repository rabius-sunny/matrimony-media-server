const jwt = require('jsonwebtoken')
const userModel = require('../models/user.js')
const bioModel = require('../models/bio.js')
const deletehide = require('../models/deletehide.js')

// Get a token from jsonwebtoken
const getToken = (user) => jwt.sign(user, process.env.SECRET_KEY)

const signup = async (req, res) => {
  const { phone, uId } = req.body

  try {
    const hasNumber = await userModel.findOne({ phone })

    if (hasNumber) {
      // Signing in
      const token = getToken({
        phone: hasNumber.phone,
        uId: hasNumber.uId,
        id: hasNumber._id
      })
      return res.status(200).json({
        message: 'Sign in successfully',
        token,
        id: hasNumber._id,
        uId: hasNumber.uId
      })
    } else {
      // Signing up
      const response = await userModel.create({ phone, uId })
      const token = getToken({
        phone: response.phone,
        uId: response.uId,
        id: response._id
      })
      const createNewBio = await bioModel.create({ user: response._id })
      await userModel.findByIdAndUpdate(response._id, {
        bio: createNewBio._id
      })

      res.status(200).json({
        message: 'User created successfully',
        token,
        id: response._id,
        uId: response.uId
      })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}

const getUser = async (req, res) => {
  const _id = req.id
  try {
    const response = await userModel
      .findById({ _id })
      .populate('bookmarks', 'type birth condition profession')
    return res.status(200).json({ user: response })
  } catch (error) {
    return res.status(404).json({ error })
  }
}

const getType = async (req, res) => {
  const user = req.id
  try {
    const response = await bioModel.findOne({ user })
    res.status(200).json({ type: response.type })
  } catch (error) {
    res.status(404).json({ error })
  }
}
const requestDeleteHide = async (req, res) => {
  const user = req.id
  try {
    const response = await deletehide.create({ ...req.body, user })
    res.status(200).json({ message: 'ok' })
  } catch (error) {
    res.status(404).json({ error })
  }
}
const getUids = async (req, res) => {
  try {
    const response = await userModel.find()
    const uIds = response.map((item) => item.uId)
    res.status(200).json({ uIds })
  } catch (error) {
    res.status(404).json({ error })
  }
}

module.exports = {
  signup,
  getUser,
  getType,
  requestDeleteHide,
  getUids
}
