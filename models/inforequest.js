const { model, Schema } = require('mongoose')

const inforequestSchema = new Schema(
  {
    fillrequired: {
      type: String,
      required: true
    },
    hasfeature: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    method: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    target: {
      type: String,
      required: true
    },
    pnumber: {
      type: String,
      required: true
    },
    trx: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: false,
      default: 'pending'
    }
  },
  { timestamps: true }
)

module.exports = model('inforequest', inforequestSchema)
