'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useContext } from 'react'

import { 
  CurrencyCircleDollar, 
  ArrowsDownUp,
  ArrowLeft,
} from '@phosphor-icons/react'

import api from '../../../config/api'
import UserContext from '../../../contexts/user'
import Form from '../../../components/Form'

export default function EditUser() {
  const router = useRouter()
  const user = useContext(UserContext)

  const [value, setValue] = useState(0)
  const [type, setType] = useState('')

  async function onSubmit(e) {
    e.preventDefault()

    if (type === 'entrada' || type === 'saída') {
      await api.post('/transaction', { 
        user_id: user.data._id,
        value: Number(value),
        type: type === 'entrada' ? 'income' : 'outcome'
      })
    }

    router.push('/transaction/wallet')
  }

  return (
    <main className='w-screen h-screen flex flex-col items-center justify-center py-16'>
      <Link href='/transaction/wallet' className='flex text-lg items-center text-slate-500'>
        <ArrowLeft size={24} color='#94A3B8' className='mr-3' />
        Voltar
      </Link>

      <h1 className='text-4xl font-semibold text-center mt-12 text-gray-800'>
        Crie uma transação
      </h1>

      <p className='text-lg max-w-xs text-center mt-4 text-gray-600'>
        Adicione seu ganho ou gasto e deixe sua carteira atualizada
      </p>

      <Form 
        buttonText='Confirmar transação'
        action={(e) => onSubmit(e)}
        fields={[
          {
            name: 'value',
            label: 'Valor',
            type: 'number',
            placeholder: '0.00',
            icon: CurrencyCircleDollar,
            onChange: setValue
          },

          {
            name: 'type',
            label: 'Tipo',
            placeholder: 'Digite entrada ou saída',
            icon: ArrowsDownUp,
            onChange: setType
          },
        ]}
      />
    </main>
  )
}