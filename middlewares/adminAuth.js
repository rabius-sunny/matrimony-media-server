import jwt from 'jsonwebtoken'
const { verify } = jwt

const adminAuth = (req, res, next) => {
  try {
    const auth_Headers = req.headers.authorization
    const token = auth_Headers.split('Bearer ')[1]
    verify(token, process.env.ADMIN_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ error: err })
      } else {
        req.id = user.id
      }
    })
    next()
  } catch (error) {
    return res.status(401).json({ errors: 'UnAuthenticated!' })
  }
}

export default adminAuth
