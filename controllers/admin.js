import jwt from 'jsonwebtoken'
import adminModel from '../models/admin.js'
const { sign } = jwt

// Get a token from jsonwebtoken
const getToken = user => sign(user, process.env.SECRET_KEY)

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