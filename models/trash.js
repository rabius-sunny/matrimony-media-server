const { model, Schema } = require('mongoose')
const trashSchema = new Schema(
  {
    phone: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

module.exports = model('trashuser', trashSchema)
