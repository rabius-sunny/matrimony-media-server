const { model, Schema } = require('mongoose')
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
    phone: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

module.exports = model('deletehide', deleteHideSchema)
