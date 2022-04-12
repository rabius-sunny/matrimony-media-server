import { verify } from 'jsonwebtoken'

const auth = (req, res, next) => {
  try {
    const auth_Headers = req.headers.authorization
    const token = auth_Headers.split('Bearer ')[1]
    verify(token, process.env.SECRET_KEY)
    next()
  } catch (error) {
    return res.status(401).json({ errors: "UnAuthenticated!" })
  }
}

export default auth