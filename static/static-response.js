const successRes = (data = null) => ({ ok: true, data })
const errorRes = (error, message = null) => ({
  error,
  message: message ?? error.message
})

module.exports = { successRes, errorRes }
