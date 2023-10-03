'use client'
import Link from "next/link"
import '@/app/globals.css'
import Icon from "../components/Icon"
import { AiOutlineSearch } from 'react-icons/ai'
import { BiHomeCircle } from 'react-icons/bi'
import { RiHome7Fill } from 'react-icons/ri'
import { IoIosNotificationsOutline, IoIosNotifications } from 'react-icons/io'
import { IoPersonOutline, IoPerson } from 'react-icons/io5'
import { usePathname } from "next/navigation"
import CreatePostButton from "../components/CreatePostButton"
import { useSession } from "next-auth/react"

export default function TabletNav() {
	const pathname = usePathname()
	const session = useSession()

	const PAGES = {
		home: '/home',
		explore: '/search',
		notifications: '/profile',
		profile: '/profile',
	}

	return (
		<nav className="hidden z-20 top-0 bg-white border-r-2 sm:flex sm:sticky flex-col justify-between h-screen items-end py-6 px-4">
			<div className="flex flex-col gap-6">
				<Link href='/' className={`h-full flex gap-2 items-center rounded-r-sm hover:underline hover:opacity-75 cursor-pointer hover:bg-zinc-100 rounded-3xl py-2 pl-2`}>
					{pathname === PAGES.home ? <RiHome7Fill className="h-10 w-10" /> : <BiHomeCircle className="h-10 w-10" />}
					<p className={`hidden lg:block text-lg ${pathname === PAGES.home ? 'font-medium' : 'font-normal'} underline-offset-2`}>Home</p>
				</Link>
				<Link href='/search' className={`h-full flex gap-2 items-center rounded-r-sm hover:underline hover:opacity-75 cursor-pointer hover:bg-zinc-100 rounded-3xl py-2 pl-2`}>
					<AiOutlineSearch className="h-10 w-10" />
					<p className={`hidden lg:block text-lg ${pathname === PAGES.explore ? 'font-medium' : 'font-normal'} underline-offset-2`}>Explore</p>
				</Link>
				<Link href='/profile' className={`h-full flex gap-2 items-center rounded-r-sm hover:underline hover:opacity-75 cursor-pointer hover:bg-zinc-100 rounded-3xl py-2 pl-2`}>
					{pathname === PAGES.notifications ? <IoIosNotifications className="h-10 w-10" /> : <IoIosNotificationsOutline className="h-10 w-10" />}
					<p className={`hidden lg:block text-lg ${pathname === PAGES.notifications ? 'font-medium' : 'font-normal'} underline-offset-2`}>Notifications</p>
				</Link>
				<Link href='/profile' className={`h-full flex gap-2 items-center rounded-r-sm hover:underline hover:opacity-75 cursor-pointer hover:bg-zinc-100 rounded-3xl py-2 pl-2`}>
					{pathname === PAGES.profile ? <IoPerson className="h-10 w-10" /> : <IoPersonOutline className="h-10 w-10" />}
					<p className={`hidden lg:block text-lg ${pathname === PAGES.profile ? 'font-medium' : 'font-normal'} underline-offset-2`}>Profile</p>
				</Link>
				<CreatePostButton />
			</div>
			{session.data && (	
				<button className="py-2 pr-1 lg:px-4 rounded-3xl hover:bg-zinc-100 flex items-center justify-center gap-2">
					<Icon username={session.data?.user?.username} icon={session.data?.user?.icon} />
					<div className='hidden lg:flex flex-col justify-center items-center'>
						<h2 className='font-bold hover:underline underline-offset-1'>
							<Link href={`/${session.data?.user?.username}`}>
								{session.data?.user?.nickname}
							</Link>
						</h2>
						<h3 className='font-light text-gray-600 text-sm'>
							<Link href={`/${session.data?.user?.username}`}>
								@{session.data?.user?.username}
							</Link>
						</h3>
					</div>
				</button>
			)}
			{!session.data && (
				<button className="py-2 pr-1 lg:px-4 rounded-3xl w-full bg-blue-400 flex items-center justify-center gap-2">
					<p className="font-bold hover:underline underline-offset-1">Login</p>
				</button>					
			)}
		</nav>
	)
}
