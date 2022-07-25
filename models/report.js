import mongoose from 'mongoose'
const { model, Schema } = mongoose

const reportSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    target: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

export default model('report', reportSchema)
