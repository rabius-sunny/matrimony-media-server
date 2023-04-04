const jwt = require('jsonwebtoken')

const adminAuth = (req, res, next) => {
  try {
    const auth_Headers = req.headers.authorization
    const token = auth_Headers.split('Bearer ')[1]
    jwt.verify(token, process.env.ADMIN_SECRET_KEY, (err, user) => {
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

module.exports = adminAuth
