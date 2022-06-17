import mongoose from 'mongoose'
const { model, Schema } = mongoose

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

export default model('admin', adminSchema)
