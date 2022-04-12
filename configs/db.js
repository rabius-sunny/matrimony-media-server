import { connect } from 'mongoose'
require('dotenv').config()

export default connection = async () => {
  try {
    const response = await connect(process.env.URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
    console.log('database connected successfully')
  } catch (error) {
    console.log(error)
  }
}