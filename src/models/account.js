import mongoose from 'mongoose'

export default mongoose.model('Account', new mongoose.Schema({
  userId: String,
  accessToken: String,
  provider: String,
  points: Number,
}))
