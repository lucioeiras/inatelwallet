import { Request, Response } from 'express'
import { hash, compare } from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/User'

const TOKEN_KEY = process.env.TOKEN_KEY || ''

class UserController {
  async index(_: Request, res: Response) {
    const users = await User.find()
    return res.json(users)
  }

  async find(req: Request, res: Response) {
    const { id } = req.params
    const user = await User.findById(id)
    return res.json(user)
  }

  async create(req: Request, res: Response) {
    const { name, email, password, amount } = req.body
    const hashedPassword = await hash(password, 10)

    const user = await User.create({ name, email, amount, password: hashedPassword })

    return res.json(user)
  }

  async update(req: Request, res: Response) {
    const { name, email } = req.body
    const { id } = req.params

    const updatedUser = await User.updateOne(
      { _id: id }, { name, email })

    return res.json(updatedUser)
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params
    await User.deleteOne({ _id: id })

    return res.sendStatus(202)
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      const user = await User.findOne({ email });

      const isPasswordCorrect =
        user && user.password && await compare(password, user.password)

      if (isPasswordCorrect) {
        const token = jwt.sign(
          { user_id: user._id, email },
            TOKEN_KEY,
          {
            expiresIn: "7d",
          }
        );

        user.token = token;
        return res.status(200).json(user);
      }

      res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
  }
}

export default new UserController()
