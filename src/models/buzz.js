import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const buzzSchema = new Schema({
  message: String,
  createdAt: { type: Date },
  expirationDate: { type: Date }
});

export default mongoose.model('Buzz', buzzSchema);
