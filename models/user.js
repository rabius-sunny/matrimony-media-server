import mongoose from 'mongoose'
const { model, Schema } = mongoose

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    bio: {
      type: Schema.Types.ObjectId,
      ref: 'bio'
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'bio'
      }
    ]
  },
  { timestamps: true }
)

export default model('user', userSchema)
