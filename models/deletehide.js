import mongoose from 'mongoose'
const { model, Schema } = mongoose

const deleteHideSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    reason: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

export default model('deletehide', deleteHideSchema)
