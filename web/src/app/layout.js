import '../styles/globals.css'
import { Epilogue } from 'next/font/google'

const epilogue = Epilogue({ subsets: ['latin'] })

export const metadata = {
  title: 'InatelWallet',
  description: 'Reúna seus ganhos e gastos em um só lugar',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={epilogue.className}>{children}</body>
    </html>
  )
}
