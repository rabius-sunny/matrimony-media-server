import mongoose from 'mongoose'
const { model, Schema } = mongoose

const messageSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

export default model('message', messageSchema)
