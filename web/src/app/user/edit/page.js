'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useContext } from 'react'

import { 
  Smiley, 
  Envelope,
  ArrowLeft,
  Trash
} from '@phosphor-icons/react'

import UserContext from '../../../contexts/user'
import Form from '../../../components/Form'

export default function EditUser() {
  const router = useRouter()
  const user = useContext(UserContext)

  const [name, setName] = useState(user.data.name)
  const [email, setEmail] = useState(user.data.email)

  async function onSubmit(e) {
    e.preventDefault()

    await user.update(name, email)

    router.push('/transaction/wallet')
  }

  async function deleteUser() {
    await user.delete()
    router.push('/user/login')
  }

  return (
    <main className='w-screen h-screen flex flex-col items-center justify-center py-16'>
      <Link href='/transaction/wallet' className='flex text-lg items-center text-slate-500'>
        <ArrowLeft size={24} color='#94A3B8' className='mr-3' />
        Voltar
      </Link>

      <h1 className='text-4xl font-semibold text-center mt-12 text-gray-800'>
        Edite seu usuário
      </h1>

      <p className='text-lg max-w-xs text-center mt-4 text-gray-600'>
        Altere seu nome e e-mail ou delete seu usuário
      </p>

      <Form 
        buttonText='Editar usuário'
        action={(e) => onSubmit(e)}
        fields={[
          {
            name: 'name',
            label: 'Nome',
            placeholder: name,
            icon: Smiley,
            onChange: setName
          },

          {
            name: 'email',
            label: 'E-mail',
            placeholder: email,
            type: 'email',
            icon: Envelope,
            onChange: setEmail
          },
        ]}
      />

      <button onClick={deleteUser} className='text-rose-500 font-medium flex mt-6'>
        <Trash size={20} color='#F43F5E' className='mr-3' />
        Deletar usuário
      </button>
    </main>
  )
}