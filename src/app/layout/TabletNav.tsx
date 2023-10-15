'use client'
import Link from 'next/link'
import '@/app/globals.css'
import { AiOutlineSearch } from 'react-icons/ai'
import { BiHomeCircle } from 'react-icons/bi'
import { RiHome7Fill } from 'react-icons/ri'
import { IoIosNotificationsOutline, IoIosNotifications } from 'react-icons/io'
import { IoPersonOutline, IoPerson } from 'react-icons/io5'
import { usePathname } from 'next/navigation'
import CreatePostButton from '../components/CreatePostButton'
import { useSession } from 'next-auth/react'
import { Popover, Typography } from '@mui/material'
import { useState } from 'react'
import { NoLinkIcon } from '../components/NoLinkIcon'

export default function TabletNav() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const pathname = usePathname()
  const session = useSession()

  const PAGES = {
    home: '/home',
    explore: '/search',
    notifications: '/profile',
    profile: `/${session.data?.user?.username}`,
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const idButton = open ? 'simple-popover' : undefined

  return (
    <nav className="hidden z-20 top-0 bg-white border-r-2 sm:flex sm:sticky flex-col justify-between h-screen items-end py-6 px-4">
      <div className="flex flex-col gap-6">
        <Link
          href="/home"
          className={`h-full flex gap-2 items-center rounded-r-sm hover:underline hover:opacity-75 cursor-pointer hover:bg-zinc-100 rounded-3xl py-2 pl-2`}
        >
          {pathname === PAGES.home ? (
            <RiHome7Fill className="h-10 w-10" />
          ) : (
            <BiHomeCircle className="h-10 w-10" />
          )}
          <p
            className={`hidden lg:block text-lg ${
              pathname === PAGES.home ? 'font-medium' : 'font-normal'
            } underline-offset-2`}
          >
            Home
          </p>
        </Link>
        <Link
          href="/search"
          className={`h-full flex gap-2 items-center rounded-r-sm hover:underline hover:opacity-75 cursor-pointer hover:bg-zinc-100 rounded-3xl py-2 pl-2`}
        >
          <AiOutlineSearch className="h-10 w-10" />
          <p
            className={`hidden lg:block text-lg ${
              pathname === PAGES.explore ? 'font-medium' : 'font-normal'
            } underline-offset-2`}
          >
            Explore
          </p>
        </Link>
        <Link
          href="/notifications"
          className={`h-full flex gap-2 items-center rounded-r-sm hover:underline hover:opacity-75 cursor-pointer hover:bg-zinc-100 rounded-3xl py-2 pl-2`}
        >
          {pathname === PAGES.notifications ? (
            <IoIosNotifications className="h-10 w-10" />
          ) : (
            <IoIosNotificationsOutline className="h-10 w-10" />
          )}
          <p
            className={`hidden lg:block text-lg ${
              pathname === PAGES.notifications ? 'font-medium' : 'font-normal'
            } underline-offset-2`}
          >
            Notifications
          </p>
        </Link>
        <Link
          href={
            session.data?.user.username
              ? `/${session.data?.user?.username}`
              : '/api/auth/signin'
          }
          className={`h-full flex gap-2 items-center rounded-r-sm hover:underline hover:opacity-75 cursor-pointer hover:bg-zinc-100 rounded-3xl py-2 pl-2`}
        >
          {pathname === PAGES.profile ? (
            <IoPerson className="h-10 w-10" />
          ) : (
            <IoPersonOutline className="h-10 w-10" />
          )}
          <p
            className={`hidden lg:block text-lg ${
              pathname === PAGES.profile ? 'font-medium' : 'font-normal'
            } underline-offset-2`}
          >
            Profile
          </p>
        </Link>
        <CreatePostButton />
      </div>
      {session.data && (
        <>
          <Popover
            id={idButton}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Typography sx={{ p: 2 }}>
              <Link href={'/api/auth/signout'}>
                <p className="flex justify-center items-center text-sm cursor-pointer transition-all gap-1 hover:text-blue-600">
                  Sign Out
                </p>
              </Link>
              <Link href={`/${session.data?.user?.username}`}>
                <p className="mt-2 flex justify-center items-center text-sm cursor-pointer transition-all gap-1 hover:text-blue-600">
                  Profile
                </p>
              </Link>
            </Typography>
          </Popover>
          <button
            className="py-2 pr-1 lg:px-4 rounded-3xl hover:bg-zinc-100 flex items-center justify-center gap-2"
            aria-describedby={idButton}
            type="button"
            onClick={handleClick}
          >
            <NoLinkIcon icon={session.data?.user?.icon} />
            <div className="hidden lg:flex flex-col justify-center items-center">
              <h2 className="font-bold hover:underline underline-offset-1">
                <Link href={`/${session.data?.user?.username}`}>
                  {session.data?.user?.nickname}
                </Link>
              </h2>
              <h3 className="font-light text-gray-600 text-sm">
                <Link href={`/${session.data?.user?.username}`}>
                  @{session.data?.user?.username}
                </Link>
              </h3>
            </div>
          </button>
        </>
      )}
      {!session.data && (
        <button className="py-2 pr-1 lg:px-4 rounded-3xl w-full bg-blue-400 flex items-center justify-center gap-2">
          <Link
            href={'/api/auth/signin'}
            className="font-bold hover:underline text-white underline-offset-1"
          >
            Login
          </Link>
        </button>
      )}
    </nav>
  )
}
