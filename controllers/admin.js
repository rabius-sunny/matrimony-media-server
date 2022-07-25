import jwt from 'jsonwebtoken'
import adminModel from '../models/admin.js'
import bio from '../models/bio.js'
const { sign } = jwt
import bioModel from '../models/bio.js'
import deletehide from '../models/deletehide.js'
import inforequest from '../models/inforequest.js'

// Get a token from jsonwebtoken
const getToken = user => sign(user, process.env.ADMIN_SECRET_KEY)

// auth operations
export const signinadmin = async (req, res) => {
  const { email, password, salt } = req.body

  try {
    const response = await adminModel.findOne({ email, password, salt })

    // Sign in
    if (response) {
      const token = getToken({
        email: response.email,
        id: response._id
      })
      res.status(200).json({ message: 'Sign in successfully', token })
    } else res.status(403).json({ message: 'UnAuthorized!' })
  } catch (error) {
    res.status(403).json({ message: 'UnAuthorized!' })
  }
}

export const signupadmin = async (req, res) => {
  try {
    const response = await adminModel.create(req.body)
    res.status(200).json({ message: 'Successfully created Admin' })
  } catch (error) {
    res.status(500).json({ error, message: 'Failed to created Admin' })
  }
}

// bio operations
export const getAllBio = async (req, res) => {
  let bios = []
  try {
    const response = await bioModel.find()
    response.map(bio =>
      bios.push({
        name: bio.name,
        condition: bio.condition,
        date: bio.createdAt,
        type: bio.type,
        user: bio.user,
        id: bio._id,
        published: bio.published,
        requested: bio.requested,
        featured: bio.featured
      })
    )
    return res.status(200).json({ message: 'ok', bios })
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}

export const getRequestedBio = async (req, res) => {
  let bios = []
  try {
    const response = await bioModel.find({ published: false })
    if (response) {
      response.map(bio =>
        bios.push({
          name: bio.name,
          condition: bio.condition,
          date: bio.createdAt,
          type: bio.type,
          user: bio.user,
          id: bio._id,
          published: bio.published
        })
      )
    }
    return res.status(200).json({ message: 'ok', bios })
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}

export const getBioById = async (req, res) => {
  try {
    const response = await bioModel.findById(req.params.id)
    res.status(200).json({ response })
  } catch (error) {
    res.status(404).json({ error, message: error.message })
  }
}

export const publishBio = async (req, res) => {
  try {
    const response = await bioModel.findByIdAndUpdate(req.params.id, {
      published: true
    })
    res.status(200).json({ message: 'ok' })
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}

// delete or hide
export const getDeleteHideReq = async (req, res) => {
  try {
    const response = await deletehide.find().populate('user', 'username -_id')
    return res.status(200).json({ requests: response })
  } catch (error) {
    return res.status(404).json({ message: 'Not found' })
  }
}

export const hideBio = async (req, res) => {
  try {
    const response = await bioModel.findByIdAndUpdate(req.params.id, {
      published: false
    })
    res.status(200).json({ message: 'ok' })
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}

export const deleteBio = async (req, res) => {
  try {
    const response = await bioModel.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'ok' })
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}

// featuring operation
export const makeFeature = async (req, res) => {
  try {
    const response = await bio.findByIdAndUpdate(req.params.id, {
      featured: true
    })
    res.status(200).json({ message: 'ok' })
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}

export const deleteFeature = async (req, res) => {
  try {
    const response = await bio.findByIdAndUpdate(req.params.id, {
      featured: false
    })
    res.status(200).json({ message: 'ok' })
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}

// info requests
export const getInfoRequests = async (req, res) => {
  try {
    const response = await inforequest.find()
    res.status(200).json({ message: 'ok', data: response })
  } catch (error) {
    res.status(404).json({ message: 'Not found' })
  }
}
