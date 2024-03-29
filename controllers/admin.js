const jwt = require('jsonwebtoken')
const sendMessage = require('../configs/sendMessage.js')
const userModel = require('../models/user.js')
const trashModel = require('../models/trash.js')
const adminModel = require('../models/admin.js')
const bio = require('../models/bio.js')
const bioModel = require('../models/bio.js')
const deletehide = require('../models/deletehide.js')
const inforequest = require('../models/inforequest.js')
const { errorRes, successRes } = require('../static/static-response.js')

// Get a token from jsonwebtoken
const getToken = (user) => jwt.sign(user, process.env.ADMIN_SECRET_KEY)

// auth operations
const signinadmin = async (req, res) => {
  const { email, password, salt } = req.body

  try {
    const response = await adminModel.findOne({ email, password, salt })

    // Sign in
    if (response) {
      const token = getToken({
        email: response.email,
        id: response._id
      })
      res.status(200).json({ message: 'Sign in successfully', token })
    } else res.status(404).json({ message: error.message })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

const signupadmin = async (req, res) => {
  try {
    await adminModel.create(req.body)
    res.status(200).json({ message: 'Successfully created Admin' })
  } catch (error) {
    res.status(500).json({ error, message: 'Failed to created Admin' })
  }
}

// bio operations
const getAllBio = async (req, res) => {
  try {
    const response = await bioModel
      .find()
      .populate('user', 'uId -_id')
      .select('name condition date type published requested featured createdAt')
    return res.status(200).json({ message: 'ok', bios: response })
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}

const getRequestedBio = async (req, res) => {
  try {
    const bios = await bioModel
      .find({ requested: true })
      .populate('user', 'uId -_id')
      .select('name condition createdAt type published')
    return res.status(200).json({ message: 'ok', bios })
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}

const getBioById = async (req, res) => {
  try {
    const response = await bioModel.findById(req.params.id)
    res.status(200).json({ response })
  } catch (error) {
    res.status(404).json({ error, message: error.message })
  }
}

const publishBio = async (req, res) => {
  try {
    await bioModel.findByIdAndUpdate(req.params.id, {
      published: true,
      requested: false
    })
    const bioUser = await userModel.findOne({ bio: req.params.id })
    console.log('phone', bioUser.phone)
    const text = `আসসালামু আলাইকুম, আপনার বায়োডাটাটি পাবলিশ করা হয়েছে। জাযাকাল্লাহু খাইরান।
    jannatijuti.com`
    await sendMessage.message
      .sendSms({
        to: `88${bioUser.phone}`,
        text
      })
      .then((res) => console.log(res))
      .catch((err) =>
        res.status(500).json({ error: err, message: err.message })
      )
    res.status(200).json({ message: 'ok' })
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}

// delete or hide
const getDeleteRequests = async (req, res) => {
  try {
    const data = await deletehide.find().populate('user', 'uId username')
    return res.status(200).json(successRes(data))
  } catch (error) {
    return res.status(404).json(errorRes(error, 'not found'))
  }
}

const hideBio = async (req, res) => {
  try {
    const response = await bioModel.findByIdAndUpdate(req.params.id, {
      published: false,
      featured: false
    })
    res.status(200).json({ message: 'ok' })
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}

const deleteBio = async (req, res) => {
  const { id, phone } = req.body
  try {
    await trashModel.create({ phone })
    // await bioModel.findByIdAndDelete(req.params.id)
    // await userModel.findOneAndDelete({ bio: req.params.id })
    res.status(200).json({ message: 'ok', response: { id, phone } })
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}

const hideBioById = async (req, res) => {
  try {
    await bioModel.findOneAndUpdate(
      { user: req.params.id },
      {
        published: false,
        featured: false
      }
    )
    // Deleting requests from request table
    await deletehide.findByIdAndDelete(req.params.reqId)
    res.status(200).json({ message: 'ok' })
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}

const deleteBioById = async (req, res) => {
  try {
    const deleteBio = await bioModel.findOneAndDelete({ user: req.params.id })
    const deleteUser = await userModel.findByIdAndDelete(req.params.id)

    // Deleting requests from request table
    const deleteRequest = await deletehide.findByIdAndDelete(req.params.reqId)
    res.status(200).json({ message: 'ok' })
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}

// featuring operation
const makeFeature = async (req, res) => {
  try {
    const response = await bio.findByIdAndUpdate(req.params.id, {
      featured: true
    })
    const userfromid = await userModel.findOne({ bio: req.params.id })
    const phone = userfromid.phone
    const text = `আসসালামু আলাইকুম, আপনার বায়োডাটাটি ফিচার করা হয়েছে। জাযাকাল্লাহু খাইরান।
    jannatijuti.com`
    const sendingMessage = await sendMessage.message
      .sendSms({
        to: `88${phone}`,
        text
      })
      .then((res) => (res) => console.log('res', res))
      .catch((err) => console.log('err', err))

    res.status(200).json({ message: 'ok' })
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}

const deleteFeature = async (req, res) => {
  try {
    const response = await bio.findByIdAndUpdate(req.params.id, {
      featured: false
    })
    res.status(200).json({ message: 'ok' })
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}

// info requests
const getInfoRequests = async (req, res) => {
  try {
    const response = await inforequest.find()
    res.status(200).json({ message: 'ok', data: response })
  } catch (error) {
    res.status(404).json({ message: 'Not found' })
  }
}

const getRequest = async (req, res) => {
  try {
    const response = await inforequest.find()
    res.status(200).json({ response })
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}

const acceptRequest = async (req, res) => {
  const { to, id, target } = req.body
  try {
    const info = await userModel
      .findOne({ uId: target })
      .populate('bio', 'guardian_number receiving_email -_id')

    const text = `আসসালামু আলাইকুম, আপনার আকাঙ্ক্ষিত বায়োডাটা ${target} এর অভিভাবকের নম্বর : ${info.bio.guardian_number}. বায়োডাটা গ্রহণের ইমেইল এ্যাড্রেস : ${info.bio.receiving_email}.
    জাযাকাল্লাহু খাইর।`

    const response = await sendMessage.message
      .sendSms({ to, text })
      .then(async (response) => {
        if (response.success) {
          const update = await inforequest.findByIdAndUpdate(id, {
            status: 'done'
          })
          return res.status(200).json({ message: 'ok' })
        } else {
          return res.status(500).json({ message: 'failed' })
        }
      })
      .catch((err) => err)
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}

const deleteRequest = async (req, res) => {
  try {
    const response = await inforequest.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'ok' })
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}

module.exports = {
  signinadmin,
  signupadmin,
  getAllBio,
  getRequestedBio,
  getBioById,
  publishBio,
  getDeleteRequests,
  hideBio,
  deleteBio,
  hideBioById,
  deleteBioById,
  makeFeature,
  deleteFeature,
  getInfoRequests,
  getRequest,
  acceptRequest,
  deleteRequest
}
