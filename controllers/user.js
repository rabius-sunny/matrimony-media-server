import jwt from 'jsonwebtoken'
const { sign } = jwt
import user from '../models/user.js'

// Get a token from jsonwebtoken
const getToken = user => sign(user, process.env.SECRET_KEY)

const signup = async (req, res) => {
  const { username, phone } = req.body

  try {
    const response = await user.findOne({ phone })
    if (response) {
      // Sign up
      const token = getToken({
        username: response.username,
        phone: response.phone,
        id: response._id
      })
      res.status(200).json({ message: 'Sign in successfully', token })
    } else {
      // Sign in
      const response = await user.create({ username, phone })
      const token = getToken({
        username: response.username,
        phone: response.phone,
        id: response._id
      })
      res.status(200).json({ message: 'User created successfully', token })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}

export default signup
