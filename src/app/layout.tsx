import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { NextAuthProvider } from './providers'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
})

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
      <body className={`${roboto.className}`}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  )
}
