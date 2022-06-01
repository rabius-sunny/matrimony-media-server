import bio from '../models/bio.js'
import userModel from '../models/user.js'

export const createBio = async (req, res) => {
  const user = req.id
  try {
    const response = await bio.findOne({ user })
    if (response) {
      const update = await bio.findByIdAndUpdate(response._id, req.body)
      res.status(200).json({ message: 'Bio updated successfully' })
    } else {
      const createNew = await bio.create({
        ...req.body,
        user
      })
      const updateUserBio = await userModel.findByIdAndUpdate(user, {
        bio: createNew._id
      })

      res.status(200).json({ message: 'Bio created successfully' })
    }
  } catch (error) {
    res.status(500).json({ error, message: error.message })
  }
}

export const getBioById = async (req, res) => {
  const user = req.params.id
  try {
    const response = await bio.findOne({ user })
    res.status(200).json({ response })
  } catch (error) {
    res.status(404).json({ error, message: error.message })
  }
}

export const getBios = async (req, res) => {
  const { type, jilla } = req.params
  try {
    if (type !== 'all' && jilla === 'all') {
      const response = await bio
        .findOne({ type })
        .populate('user', 'username -_id')
      res.status(200).json({ response })
    } else if (jilla !== 'all' && type === 'all') {
      const response = await bio
        .findOne({ permanent_jilla: jilla })
        .populate('user', 'username -_id')
      res.status(200).json({ response })
    } else if (type === 'all' && jilla === 'all') {
      const response = await bio.find().populate('user', 'username -_id')
      res.status(200).json({ response })
    } else {
      const response = await bio
        .findOne({ type, permanent_jilla: jilla })
        .populate('user', 'username -_id')
      res.status(200).json({ response })
    }
  } catch (error) {
    res.status(404).json({ error, message: error.message })
  }
}
