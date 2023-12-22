const { model, Schema } = require('mongoose')

const userSchema = new Schema(
  {
    uId: {
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
    ],
    fields: {
      primary: {
        type: Boolean,
        default: false
      },
      personal: {
        type: Boolean,
        default: false
      },
      marriage: {
        type: Boolean,
        default: false
      },
      general: {
        type: Boolean,
        default: false
      },
      family: {
        type: Boolean,
        default: false
      },
      address: {
        type: Boolean,
        default: false
      },
      education: {
        type: Boolean,
        default: false
      },
      others: {
        type: Boolean,
        default: false
      },
      expectation: {
        type: Boolean,
        default: false
      },
      contact: {
        type: Boolean,
        default: false
      }
    }
  },
  { timestamps: true }
)

module.exports = model('user', userSchema)
