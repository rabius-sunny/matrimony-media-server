import jwt from 'jsonwebtoken'
const { sign } = jwt
import user from '../models/user.js'

// Get a token from jsonwebtoken
const getToken = user => sign(user, process.env.SECRET_KEY)

const signup = async (req, res) => {
  const { username, phone } = req.body

  try {
    const onlynumber = await user.findOne({ phone })
    const onlyusername = await user.findOne({ username })
    const phoneandnumber = await user.findOne({ username, phone })

    // Sign in
    if (phoneandnumber) {
      const token = getToken({
        username: phoneandnumber.username,
        phone: phoneandnumber.phone,
        id: phoneandnumber._id
      })
      res.status(200).json({ message: 'Sign in successfully', token })
    } else if (onlynumber) {
      res
        .status(404)
        .json({
          message: `This * ${username} * is a wrong username! The number ${phone} already exists.`
        })
    } else if (onlyusername) {
      res
        .status(404)
        .json({
          message: `This * ${phone} * is a wrong number! The username ${username} already exists.`
        })
    } else {
      // Sign up
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
