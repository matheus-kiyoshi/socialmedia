'use client'
import '@/app/globals.css'
import { useRouter } from 'next/navigation'
import { IoArrowBackSharp } from 'react-icons/io5'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { useEffect, useRef, useState } from 'react'

export default function ProfileHeader() {
	const scrollYRef = useRef(0)
	const [scrollY, setScrollY] = useState(0)
	const router = useRouter()

	useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY
			setScrollY(scrollYRef.current)
		}

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])

	return (
		<header className={`grid-area-header bg-white ${scrollY > 80 ? 'bg-opacity-80 border-b' : 'bg-opacity-60'} w-full sm:w-[558px] fixed top-0 z-20 h-16 flex items-center justify-between px-2`}>
			<div className='flex items-center gap-3'>
				<button onClick={() => router.back()} className='rounded-full p-1 bg-zinc-700'>
					<IoArrowBackSharp className='h-8 w-8 text-white' />
				</button>
				{scrollY > 80 && (
					<h1 className='font-semibold text-xl'>username</h1>
				)}
			</div>
			{scrollY < 80 ? (
				<button className='rounded-full p-1 bg-zinc-700'>
					<BiDotsVerticalRounded className='h-8 w-8 text-white' />
				</button>
			) : (
				<>
					<button className='rounded-2xl py-1.5 px-6 bg-blue-400 text-white font-medium'>Follow</button>
				</>
			)}
    </header>
	)
}