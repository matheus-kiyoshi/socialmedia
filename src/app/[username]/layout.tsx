import '../globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import TabletNav from '../layout/TabletNav'
import ProfileHeader from '../layout/ProfileHeader'
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
      <body className={`${roboto.className} grid grid-layout-mobile sm:flex flex-row justify-between md:justify-center`}>
				<div className='grid grid-layout-mobile sm:flex flex-row justify-between md:justify-center'>
					<div>
						<TabletNav />
					</div>
					<div className='md:border-r-2 sm:w-[560px]'>
						{children}
					</div>
				</div>
      </body>
    </html>
  )
}
