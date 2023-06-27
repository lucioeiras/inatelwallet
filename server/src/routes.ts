import { Router } from 'express'

import UserController from './controllers/User'
import TransactionController from './controllers/Transaction'

const routes = Router()

routes.get('/user', (req, res) => UserController.index(req, res))
routes.get('/user/:id', (req, res) => UserController.find(req, res))
routes.post('/user', (req, res) => UserController.create(req, res))
routes.put('/user/:id', (req, res) => UserController.update(req, res))
routes.delete('/user/:id', (req, res) => UserController.delete(req, res))

routes.get('/transaction', (req, res) => TransactionController.index(req, res))
routes.get('/transaction/:user_id', (req, res) => TransactionController.find(req, res))
routes.post('/transaction', (req, res) => TransactionController.create(req, res))
routes.put('/transaction/:id', (req, res) => TransactionController.update(req, res))
routes.delete('/transaction/:id', (req, res) => TransactionController.delete(req, res))

routes.post('/login', async (req, res) => UserController.login(req, res))

export default routes
