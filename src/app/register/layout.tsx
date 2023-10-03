import '../globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Incognito Social',
  description: 'Create Your Account',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`w-screen h-screen`}>
        {children}
      </body>
    </html>
  )
}