import SendLime from '@sendlime/server-sdk'

const sendMessage = new SendLime({
  apiKey: process.env.SENDLIME_API_KEY,
  apiSecret: process.env.SENDLIME_API_SECRET
})
export default sendMessage
