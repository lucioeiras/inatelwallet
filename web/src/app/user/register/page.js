'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'

import { 
  Smiley, 
  Envelope, 
  Key, 
  ShieldCheck,
  CoinVertical 
} from '@phosphor-icons/react'

import Form from '../../../components/Form'

import UserContext from '../../../contexts/user'

export default function SignUp() {
  const router = useRouter()
  const user = useContext(UserContext)

  const [name, setName] = useState('')
  const [initialAmount, setInitialAmount] = useState(0.00)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  async function onSubmit(e) {
    e.preventDefault()

    if (password === confirmPassword) {
      await user.register(name, initialAmount, email, password)
      router.push('/transaction/wallet')
    }
  }

  return (
    <main className='w-screen flex flex-col items-center justify-center py-16'>
      <Image 
        src="../logo.svg" 
        alt="InatelWallet" 
        width={178} 
        height={32} 
      />

      <h1 className='text-4xl font-semibold text-center mt-12 text-gray-800'>
        Crie sua conta
      </h1>

      <p className='text-lg max-w-xs text-center mt-4 text-gray-600'>
        Já possui uma conta? Faça seu login clicando <Link href='/user/login' className='underline text-blue-500'>aqui</Link>.
      </p>

      <Form 
        buttonText='Criar sua conta'
        action={(e) => onSubmit(e)}
        fields={[
          {
            name: 'name',
            label: 'Nome',
            placeholder: 'Digite seu nome lindo',
            icon: Smiley,
            onChange: setName
          },

          {
            name: 'amount',
            label: 'Saldo atual',
            placeholder: 'Entre com o seu saldo atual',
            type: 'number',
            icon: CoinVertical,
            onChange: setInitialAmount
          },

          {
            name: 'email',
            label: 'E-mail',
            placeholder: 'Digite seu melhor e-mail',
            type: 'email',
            icon: Envelope,
            onChange: setEmail
          },

          {
            name: 'password',
            label: 'Senha',
            placeholder: 'Digite sua senha mais segura',
            type: 'password',
            icon: Key,
            onChange: setPassword
          },

          {
            name: 'confirmPassword',
            label: 'Confirme a senha',
            placeholder: 'Digite sua senha novamente',
            type: 'password',
            icon: ShieldCheck,
            onChange: setConfirmPassword
          },
        ]}
      />
    </main>
  )
}