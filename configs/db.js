const mongoose = require('mongoose')

const connection = async () => {
  try {
    const response = await mongoose.connect(process.env.URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
    console.log('database connected successfully')
  } catch (error) {
    console.log(error)
  }
}

module.exports = connection
