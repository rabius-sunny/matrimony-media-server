import jwt from 'jsonwebtoken'
const { sign } = jwt
import userModel from '../models/user.js'
import bioModel from '../models/bio.js'
import fields from '../assets/fields.js'
import deletehide from '../models/deletehide.js'

// Get a token from jsonwebtoken
const getToken = user => sign(user, process.env.SECRET_KEY)

export const signup = async (req, res) => {
  const { username, phone } = req.body

  try {
    const onlynumber = await userModel.findOne({ phone })
    const onlyusername = await userModel.findOne({ username })
    const phone_user = await userModel.findOne({ username, phone })

    // Sign in
    if (phone_user) {
      const token = getToken({
        username: phone_user.username,
        phone: phone_user.phone,
        id: phone_user._id
      })
      res.status(200).json({
        message: 'Sign in successfully',
        token,
        id: phone_user._id,
        username: phone_user.username
      })
    } else if (onlynumber) {
      res.status(404).json({
        message: `This * ${username} * is a wrong username! The number ${phone} already exists.`
      })
    } else if (onlyusername) {
      res.status(404).json({
        message: `This * ${phone} * is a wrong number! The username ${username} already exists.`
      })
    } else {
      // Sign up
      const response = await userModel.create({ username, phone })
      const token = getToken({
        username: response.username,
        phone: response.phone,
        id: response._id
      })
      const makeFields = await userModel.findByIdAndUpdate(response._id, {
        $set: {
          fields
        }
      })

      res
        .status(200)
        .json({ message: 'User created successfully', token, id: response._id })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getUser = async (req, res) => {
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

export const getType = async (req, res) => {
  const user = req.id
  try {
    const response = await bioModel.findOne({ user })
    res.status(200).json({ type: response.type })
  } catch (error) {
    res.status(404).json({ error })
  }
}
export const requestDeleteHide = async (req, res) => {
  const user = req.id
  try {
    const response = await deletehide.create({ ...req.body, user })
    res.status(200).json({ message: 'ok' })
  } catch (error) {
    res.status(404).json({ error })
  }
}
