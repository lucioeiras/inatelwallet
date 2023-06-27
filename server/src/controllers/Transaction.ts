import { Request, Response } from 'express'

import User from '../models/User'
import Transaction from '../models/Transaction'

class TransactionController {
  async index(_: Request, res: Response) {
    const transactions = await Transaction.find()
    return res.json(transactions)
  }

  async find(req: Request, res: Response) {
    const { user_id } = req.params
    const user = await User.findById(user_id)

    if (!user) {
      return res.status(404)
    }

    const transactions = await Transaction.find({ user_id })
    return res.json(transactions)
  }

  async create(req: Request, res: Response) {
    const { user_id, value, type } = req.body

    const user = await User.findById(user_id)

    if (!user) {
      return res.status(404)
    }

    const transaction = await Transaction.create({ user_id, value, type })
    user.amount && await User.updateOne({ _id: user_id }, {
      amount: type === 'income' ? user.amount + value : user.amount - value
    })

    return res.json(transaction)
  }

  async update(req: Request, res: Response) {
    const { user_id, value, type } = req.body
    const { id } = req.params

    const transaction = await Transaction.findById(id)
    const user = await User.findById(user_id)

    if (!transaction || !user) {
      return res.status(404)
    }

    transaction.value && user.amount && await User.updateOne({ _id: user_id }, {
      amount: transaction.type === 'income' ? user.amount - transaction.value : user.amount + transaction.value
    })

    transaction.value && user.amount && await User.updateOne({ _id: user_id }, {
      amount: type === 'income' ? user.amount + value : user.amount - value
    })

    await Transaction.updateOne({ _id: id}, { value, type })

    return res.sendStatus(200)
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params
    const transaction = await Transaction.findById(id)
    const user = await User.findById(transaction?.user_id)

    transaction && transaction.value &&  user?.amount && await User.updateOne({ _id: transaction?.user_id }, {
      amount: transaction.type === 'income' ? user.amount - transaction.value : user.amount + transaction.value
    })

    await Transaction.deleteOne({ _id: id })

    return res.sendStatus(202)
  }
}

export default new TransactionController()
