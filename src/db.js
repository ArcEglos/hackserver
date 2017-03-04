import mongoose from 'mongoose'

export default (config, callback) => {
  mongoose.connect(config.db.url)

	// connect to a database if needed, then pass it to `callback`:
	callback()
}
