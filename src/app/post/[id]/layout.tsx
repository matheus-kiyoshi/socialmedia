import TabletNav from '@/app/layout/TabletNav'
import '@/app/globals.css'
import { Roboto } from 'next/font/google'
import PostHeader from '@/app/layout/PostHeader'
import PostFooter from '@/app/layout/PostFooter'

const roboto = Roboto(
  { 
    weight: ['400', '500', '700'],
    subsets: ['latin'] 
  }
)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className={`${roboto.className} grid grid-layout-mobile sm:flex flex-row justify-between md:justify-center`}>
      <div className='grid grid-layout-mobile sm:flex flex-row justify-between md:justify-center'>
        <div>
          <TabletNav />
        </div>
        <div className='md:border-r-2 md:w-[560px]'>
          <PostHeader />
          {children}
          <PostFooter />
        </div>
      </div>
    </section>
  )
}
