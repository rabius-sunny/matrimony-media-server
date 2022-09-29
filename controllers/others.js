import message from '../models/message.js'
import report from '../models/report.js'

export const getReport = async (req, res) => {
  try {
    const response = await report.find()
    res.status(200).json({ response })
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}

export const makeReport = async (req, res) => {
  const user = req.id
  const target = req.params.target
  try {
    const response = await report.create({ user, target })
    res.status(200).json({ message: 'ok' })
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}

export const deleteReport = async (req, res) => {
  const id = req.params.id
  try {
    const response = await report.findByIdAndDelete(id)
    res.status(200).json({ message: 'ok' })
  } catch (error) {
    res.status(500).json({ error, message: error })
  }
}

export const postMessage = async (req, res) => {
  try {
    const response = await message.create(req.body)
    res.status(200).json({ message: 'ok' })
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}
export const deleteMessage = async (req, res) => {
  try {
    const response = await message.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'ok' })
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}
