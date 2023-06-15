import './globals.scss'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Daily Manage',
  description: 'Aplicação que auxilia na criação de formulários rotineiros',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} bg-background dark:bg-background-dark`}>{children}</body>
    </html>
  )
}
