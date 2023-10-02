import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import MobileHeader from './layout/MobileHeader'
import MobileNav from './layout/MobileNav'
import TabletNav from './layout/TabletNav'
import CreatePostButton from './components/CreatePostButton'
import Modal from './components/modal/Modal'
import { SessionProvider } from 'next-auth/react'

const roboto = Roboto(
  { 
    weight: ['400', '500', '700'],
    subsets: ['latin'] 
  }
)

export const metadata: Metadata = {
  title: 'Incognito Social',
  description: 'Your anonymous social network.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} grid grid-layout-mobile sm:flex justify-between md:justify-center`}>
        {children}
      </body>
    </html>
  )
}
