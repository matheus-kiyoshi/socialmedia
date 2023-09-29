import Link from "next/link"
import '@/app/globals.css'
import Icon from "../components/Icon"
import { AiFillHome, AiOutlineSearch } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'

export default function TabletNav() {
	let activePage = '/'

	return (
		<nav className="hidden z-20 top-0 bg-white border-r-2 sm:flex sm:sticky flex-col justify-between h-screen items-end py-6 px-4">
			<div className="flex flex-col gap-6">
				<Link href='/' className={`h-full flex items-center rounded-r-sm ${activePage === '/' && 'text-blue-400'}`}>
					<AiFillHome className="h-10 w-10 cursor-pointer hover:opacity-80 transition-all duration-300" />
				</Link>
				<Link href='/search' className={`h-full flex items-center rounded-r-sm ${activePage === '/search' && 'text-blue-400'}`}>
					<AiOutlineSearch className="h-10 w-10 cursor-pointer hover:opacity-80 transition-all duration-300" />
				</Link>
				<Link href='/profile' className={`h-full flex items-center rounded-r-sm ${activePage === '/profile' && 'text-blue-400'}`}>
					<CgProfile className="h-10 w-10 cursor-pointer hover:opacity-80 transition-all duration-300" />
				</Link>
			</div>
			<Icon username='mtyxxx' icon="/favicon.ico" />
		</nav>
	)
}
