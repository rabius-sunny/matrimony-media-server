const { model, Schema } = require('mongoose')

const adminSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  }
})

module.exports = model('admin', adminSchema)
