import jwt from 'jsonwebtoken'
import adminModel from '../models/admin.js'
const { sign } = jwt
import bioModel from '../models/bio.js'

// Get a token from jsonwebtoken
const getToken = user => sign(user, process.env.ADMIN_SECRET_KEY)

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
        id: bio._id
      })
    )
    res.status(200).json({ message: 'ok', bios })
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}
