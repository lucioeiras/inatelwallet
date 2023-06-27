import { createContext } from 'react'

import api from '../config/api'

const UserContext = createContext({
  data: {
    _id: localStorage.getItem('_id') || '',
    name: localStorage.getItem('name') || '',
    amount: localStorage.getItem('amount') || 0,
    email: localStorage.getItem('email') || '',
    password: localStorage.getItem('password') || '',
    token: localStorage.getItem('token') || '',
  },

  store(data) {
    data._id && localStorage.setItem('_id', data._id)
    data.name && localStorage.setItem('name', data.name)
    data.amount && localStorage.setItem('amount', data.amount)
    data.email && localStorage.setItem('email', data.email)
    data.password && localStorage.setItem('password', data.password)
    data.token && localStorage.setItem('token', data.token)
  },

  async login(email, password) {
    const { data } = await api.post('/login', { email, password })
    this.data = data
    this.store(data)
  },

  async logout() {
    localStorage.removeItem('_id')
    localStorage.removeItem('name')
    localStorage.removeItem('amount')
    localStorage.removeItem('email')
    localStorage.removeItem('password')
    localStorage.removeItem('token')

    this.data = {}
  },

  async register(name, initialAmount, email, password) {
    await api.post('/user', { name, email, password, amount: initialAmount })
    this.login(email, password)
  },

  async changeAmount(newAmount) {
    this.data.amount = newAmount
    this.store({ amount: newAmount })
  },

  async update(name, email) {
    await api.put(`/user/${this.data._id}`, { name, email })
    this.data.name = name
    this.data.email = email
    this.store(this.data)
  },

  async delete() {
    await api.delete(`/user/${this.data._id}`)
    this.logout()
  }
})

export default UserContext
