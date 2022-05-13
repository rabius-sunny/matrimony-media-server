import mongoose from 'mongoose'
const { connect } = mongoose

const connection = async () => {
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

export default connection
