'use client'
import Link from 'next/link'
import '../globals.css'
import { AiFillHome, AiOutlineSearch } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { usePathname } from 'next/navigation'

export default function MobileNav() {
  const pathname = usePathname()

	return (
		<nav className="grid-area-footer w-full h-16 fixed bottom-0 bg-slate-200 flex justify-around items-center z-10 sm:hidden">
      <Link href='/home' className={`h-full flex items-center rounded-t-sm ${pathname === '/home' && 'border-t-4 border-blue-400'}`}>
        <AiFillHome className="h-8 w-8 cursor-pointer hover:opacity-80 transition-all duration-300" />
      </Link>
      <Link href='/search' className={`h-full flex items-center rounded-t-sm ${pathname === '/search' && 'border-t-4 border-blue-400'}`}>
        <AiOutlineSearch className="h-8 w-8 cursor-pointer hover:opacity-80 transition-all duration-300" />
      </Link>
      <Link href='/profile' className={`h-full flex items-center rounded-t-sm ${pathname === '/profile' && 'border-t-4 border-blue-400'}`}>
        <CgProfile className="h-8 w-8 cursor-pointer hover:opacity-80 transition-all duration-300" />
      </Link>
    </nav>
	)
}
