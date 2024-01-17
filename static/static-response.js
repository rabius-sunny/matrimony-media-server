const successMsg = (data = null) => ({ ok: true, data })
const errorMsg = (error, message = null) => ({
  error,
  message: message ?? error.message
})

module.exports = { successMsg, errorMsg }
