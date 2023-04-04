const { model, Schema } = require('mongoose')

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

module.exports = model('report', reportSchema)
