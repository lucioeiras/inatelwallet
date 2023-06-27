import mongoose from 'mongoose'

const MONGO_URL = process.env.MONGO_URL || ''

async function connect() {
  await mongoose.connect(MONGO_URL);
}

connect()
