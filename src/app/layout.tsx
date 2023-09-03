import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Teklif.az',
  description: 'Azərbaycanlıların opensource bazası',
}

type RootLayoutProps = {
  children: ReactNode
}

const RootLayout = ({
  children,
}: RootLayoutProps) =>{
  return (
    <html lang="en">
      <body className={"flex flex-col min-h-screen"}>
        <Header/>
        <main className="flex flex-grow flex-col items-center justify-between p-24">{children}</main>
        <Footer />
        </body>
    </html>
  )
}

export default RootLayout