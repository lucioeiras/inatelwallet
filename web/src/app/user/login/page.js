'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'

import { Envelope, Key } from '@phosphor-icons/react'

import Form from '../../../components/Form'

import UserContext from '../../../contexts/user'

export default function SignIn() {
  const router = useRouter()
  const user = useContext(UserContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function onSubmit(e) {
    e.preventDefault()

    await user.login(email, password)
    router.push('/transaction/wallet')
  }

  if (user.data._id) {
    router.push('/transaction/wallet')
  }

  return (
    <main className='w-screen h-screen flex flex-col items-center justify-center'>
      <Image 
        src="../logo.svg" 
        alt="InatelWallet" 
        width={178} 
        height={32} 
      />

      <h1 className='text-4xl font-semibold text-center mt-12 text-gray-800'>
        Entre na sua conta
      </h1>

      <p className='text-lg max-w-xs text-center mt-4 text-gray-600'>
        Ainda não tem uma conta? Faça seu registro <Link href='/user/register' className='underline text-blue-500'>aqui</Link>.
      </p>

      <Form 
        buttonText='Entrar na plataforma'
        action={e => onSubmit(e)}
        fields={[
          {
            name: 'email',
            label: 'E-mail',
            placeholder: 'Digite seu e-mail',
            type: 'email',
            icon: Envelope,
            onChange: setEmail
          },

          {
            name: 'password',
            label: 'Senha',
            placeholder: 'Digite sua senha',
            type: 'password',
            icon: Key,
            onChange: setPassword
          },
        ]}
      />
    </main>
  )
}