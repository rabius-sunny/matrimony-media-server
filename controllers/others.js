const message = require('../models/message.js')
const report = require('../models/report.js')

const getReport = async (req, res) => {
  try {
    const response = await report.find()
    res.status(200).json({ response })
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}

const makeReport = async (req, res) => {
  const user = req.id
  const target = req.params.target
  try {
    const response = await report.create({ user, target })
    res.status(200).json({ message: 'ok' })
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}

const deleteReport = async (req, res) => {
  const id = req.params.id
  try {
    const response = await report.findByIdAndDelete(id)
    res.status(200).json({ message: 'ok' })
  } catch (error) {
    res.status(500).json({ error, message: error })
  }
}

const postMessage = async (req, res) => {
  try {
    const response = await message.create(req.body)
    res.status(200).json({ message: 'ok' })
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}
const getMessage = async (req, res) => {
  try {
    const response = await message.find()
    res.status(200).json({ response })
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}
const deleteMessage = async (req, res) => {
  try {
    const response = await message.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'ok' })
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}

module.exports = {
  getReport,
  makeReport,
  deleteReport,
  postMessage,
  getMessage,
  deleteMessage
}
