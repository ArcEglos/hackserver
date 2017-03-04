import mongoose from 'mongoose'

export default callback => {
  let user = process.env.DB_USER
  let password = process.env.DB_PASSWORD
  let db = process.env.DB_NAME || 'finder'
  let host = process.env.DB_HOST || 'localhost'
  let port = process.env.DB_PORT || '27017'
  let credentials = ''

  if (user || password) {
    credentials = `${user}:${password}@`
  }

  mongoose.connect(`mongodb://${credentials}${host}:${port}/${db}`)

	// connect to a database if needed, then pass it to `callback`:
	callback()
}
