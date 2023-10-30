'use client'
import '@/app/globals.css'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { useEffect, useRef, useState } from 'react'
import ReturnButton from '../components/ReturnButton'
import Link from 'next/link'
import { Popover, Typography } from '@mui/material'

type User = {
  _id: string
  username: string
  nickname: string
  bio: string
  icon: string
  posts: string[]
}

export default function ProfileHeader({ user }: { user?: User }) {
  const [scrollY, setScrollY] = useState(0)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const scrollYRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY
      setScrollY(scrollYRef.current)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const idButton = open ? 'simple-popover' : undefined

  return (
    <header
      className={`grid-area-header ${
        scrollY > 80
          ? 'bg-opacity-80 border-b bg-white backdrop-blur-sm'
          : 'bg-transparent'
      } w-full sm:w-[558px] fixed top-0 z-20 h-16 flex items-center justify-between px-2`}
    >
      <div className="flex items-center gap-3">
        <ReturnButton />
        {scrollY > 80 && (
          <div>
            <h1 className="font-semibold text-xl">{user?.username}</h1>
            <h2>{user?.posts.length} Posts</h2>
          </div>
        )}
      </div>
      {scrollY < 80 ? (
        <>
          <button 
            aria-describedby={idButton}
            type="button"
            onClick={handleClick}
            className="rounded-full p-1 bg-zinc-700"
          >
            <BiDotsVerticalRounded className="h-8 w-8 text-white" />
          </button>
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
              <Link href={`/compose/${user?.username}/reportuser`}>
                <p className="flex justify-center items-center text-sm cursor-pointer transition-all gap-1 hover:text-blue-600">
                  Report User
                </p>
              </Link>
            </Typography>
          </Popover>
        </>
      ) : (
        <>
          <Link href={`/compose/${user?.username}/reportuser`} className="rounded-2xl py-1.5 px-6 bg-blue-400 text-white font-medium">
            Report
          </Link>
        </>
      )}
    </header>
  )
}
