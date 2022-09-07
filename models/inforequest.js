import mongoose from 'mongoose'
const { model, Schema } = mongoose

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
      required: true
    }
  },
  { timestamps: true }
)

export default model('inforequest', inforequestSchema)
