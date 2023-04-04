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
    fields: [
      {
        type: Object,
        required: false
      }
    ]
  },
  { timestamps: true }
)

module.exports = model('user', userSchema)
