'use client'
import '@/app/globals.css'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { useEffect, useRef, useState } from 'react'
import ReturnButton from '../components/ReturnButton'

type User = {
  _id: string
  username: string
  nickname: string
  bio: string
  icon: string
  posts: string[]
}

export default function ProfileHeader({ user }: { user?: User }) {
  const scrollYRef = useRef(0)
  const [scrollY, setScrollY] = useState(0)

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
        <button className="rounded-full p-1 bg-zinc-700">
          <BiDotsVerticalRounded className="h-8 w-8 text-white" />
        </button>
      ) : (
        <>
          <button className="rounded-2xl py-1.5 px-6 bg-blue-400 text-white font-medium">
            Report
          </button>
        </>
      )}
    </header>
  )
}
