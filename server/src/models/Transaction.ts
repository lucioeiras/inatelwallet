import mongoose, { Schema } from 'mongoose'

const transactionSchema = new Schema({
  user_id: String,
  value: Number,
  type: String
})

const Transaction = mongoose.model('Transactions', transactionSchema)

export default Transaction
