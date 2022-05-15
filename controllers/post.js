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
    res.status(500).json({ error })
  }
}
