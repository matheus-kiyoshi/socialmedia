import '../globals.css'
import { Roboto } from 'next/font/google'
import MobileHeader from '../layout/MobileHeader'
import MobileNav from '../layout/MobileNav'
import TabletNav from '../layout/TabletNav'
import CreatePostButton from '../components/CreatePostButton'
const roboto = Roboto(
  { 
    weight: ['400', '500', '700'],
    subsets: ['latin'] 
  }
)

export default function HomeLayout({
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
          <MobileHeader />
          {children}
        </div>
        <div className='sm:hidden'>
          <CreatePostButton />
        </div>
        <MobileNav />
      </div>
    </section>
  )
}
