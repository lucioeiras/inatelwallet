'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useContext, useState, useEffect } from 'react'

import {
  ArrowUp,
  ArrowDown,
  PiggyBank,
  TrashSimple,
  User,
  SignOut
} from '@phosphor-icons/react'

import api from '../../../config/api'
import UserContext from '../../../contexts/user'

export default function Wallet() {
  const router = useRouter()
  const user = useContext(UserContext)

  const [userAmount, setUserAmount] = useState(0)
  const [transactions, setTransactions] = useState([])
  const [totalIncome, setTotalIncome] = useState(0)
  const [totalOutcome, setTotalOutcome] = useState(0)

  if (!user.data._id) {
    router.push('/user/login')
  }

  async function getTransactions() {
    const { data: { amount } } = await api.get(`/user/${user.data._id}`)
    const { data: transactions } = await api.get(`/transaction/${user.data._id}`)

    user.changeAmount(amount)
    setUserAmount(amount)

    setTransactions(transactions.reverse())
  }

  function logout() {
    user.logout()
    router.push('/user/login')
  }

  async function deleteTransaction(transactionId) {
    await api.delete(`/transaction/${transactionId}`)
    getTransactions()
  }

  useEffect(() => {
    getTransactions()
  }, [])
  
  useEffect(() => {
    setTotalIncome(transactions
      .filter(transaction => transaction.type === 'income')
      .map(transaction => transaction.value)
      .reduce((total, value) => total + value, 0)
    )

    setTotalOutcome(transactions
      .filter(transaction => transaction.type === 'outcome')
      .map(transaction => transaction.value)
      .reduce((total, value) => total + value, 0)
    )
  }, [transactions])

  return (
    <main className='w-screen'>
      <header className='px-8 py-6 w-full bg-slate-100'>
        <div className='flex w-full justify-between'>
          <Link href='/user/edit'>
            <User color="#64748B" size={24} />
          </Link>
          
          <Image 
            src="../logo.svg" 
            alt="InatelWallet" 
            width={134} 
            height={24} 
          />
          <button onClick={logout}>
            <SignOut color="#64748B" size={24} />
          </button>
        </div>

        <div className='mt-6'>
          <div className='bg-white p-5 rounded-lg'>
            <div className='flex'>
              <PiggyBank color="#94A3B8" size={24} />
              <h3 className='tracking-widest text-slate-700 ml-auto'>
                SEU SALDO
              </h3>
            </div>
            
            <div className='flex mt-4 items-end'>
              
              <span className='ml-auto mr-2 text-slate-500 text-xl'>
                R$
              </span>
              <p className='text-5xl text-slate-800'>
                {userAmount.toFixed(2)}
              </p>
            </div>
          </div>

          <div className='mt-6 flex'>
            <div className='bg-white p-5 rounded-lg w-full mr-6'>
              <div className='flex'>
                <ArrowUp color="#94A3B8" size={20} />
                <h3 className='tracking-widest text-slate-700 ml-auto'>
                  ENTRADAS
                </h3>
              </div>
              
              <div className='flex mt-4 items-end'>
                <span className='ml-auto mr-2 text-slate-500 text-lg'>
                  R$
                </span>
                <p className='text-3xl text-emerald-500'>
                  { totalIncome.toFixed(2) }
                </p>
              </div>
            </div>

            <div className='bg-white p-5 rounded-lg w-full'>
              <div className='flex'>
                <ArrowDown color="#94A3B8" size={20} />
                <h3 className='tracking-widest text-slate-700 ml-auto'>
                  SAÍDAS
                </h3>
              </div>
              
              <div className='flex mt-4 items-end'>
                
                <span className='ml-auto mr-2 text-slate-500 text-lg'>
                  R$
                </span>
                <p className='text-3xl text-rose-500'>
                  {'-' + totalOutcome.toFixed(2) }
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className='p-8'>
        <div className='flex w-full justify-between items-center'>
          <h1 className='text-2xl text-slate-700 font-medium'>
            Suas transações
          </h1>

          <Link href='/transaction/create' className='text-blue-500 font-semibold hover:text-blue-700 transition duration-300'>
            + Adicionar
          </Link>
        </div>

        <ul className='mt-4'>
          { transactions.map(transaction => (
            <li key={transaction._id} className='flex items-center p-4 rounded-lg bg-slate-50 mt-4'>
              { transaction.type === 'outcome' 
                ? (
                  <div className='bg-red-100 p-2 rounded-full'>
                    <ArrowDown color='#F43F5E' size={20}/>
                  </div>
                )
                : (
                  <div className='bg-emerald-100 p-2 rounded-full'>
                    <ArrowUp color='#14B8A6' size={20}/>
                  </div>
                )
              }

              <span className='ml-6 mr-2 text-slate-500'>
                R$
              </span>
              <p className='text-2xl text-slate-700'>
                {transaction.value}
              </p>

              <button onClick={() => deleteTransaction(transaction._id)} className='ml-auto'>
                <TrashSimple size={20} color='#94A3B8' />
              </button>
            </li>
          )) }
        </ul>
      </div>
    </main>
  )
}