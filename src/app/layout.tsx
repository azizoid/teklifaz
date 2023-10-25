import { PropsWithChildren } from 'react'


import type { Metadata } from 'next'

import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'

import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Teklif.az',
  description: 'Azərbaycanlıların opensource bazası',
}

const RootLayout = ({
  children,
}: PropsWithChildren) => (
  <html lang="en">
    <body className={'flex flex-col min-h-screen'}>
      <Header/>

      <main className="flex flex-grow flex-col items-center justify-around p-24">{children}</main>

      <Footer />
    </body>
  </html>
)

export default RootLayout