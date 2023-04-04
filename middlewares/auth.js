const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  try {
    const auth_Headers = req.headers.authorization
    const token = auth_Headers.split('Bearer ')[1]
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403)
      } else {
        req.phone = user.phone
        req.id = user.id
        req.uId = user.uId
      }
    })
    next()
  } catch (error) {
    return res.status(401).json({ errors: 'UnAuthenticated!' })
  }
}

module.exports = auth
