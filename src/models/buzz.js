import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const buzzSchema = new Schema({
  message: String,
  createdAt: { type: Date },
  expirationDate: { type: Date }
});

return mongoose.model('Buzz', buzzSchema);

const create = (message, lifetime) => {
  const expirationDate = new Date().setSeconds(new Date().getSeconds() + lifetime);
  const buzz = new Buzz({ message, expirationDate})

  return buzz.save();
}

const getAlive = () => {
  return Buzz.find({ expirationDate: { $gt: new Date() } }, 'message createdAt').exec();
}

export default {
  create,
}
