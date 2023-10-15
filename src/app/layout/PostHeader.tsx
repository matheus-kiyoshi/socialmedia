'use client'
import '@/app/globals.css'
import { useRouter } from 'next/navigation'
import { IoArrowBackSharp } from 'react-icons/io5'

export default function PostHeader() {
  const router = useRouter()

  return (
    <header
      className={`grid-area-header bg-white border-b w-full sticky top-0 z-20 h-16 flex items-center justify-start px-2`}
    >
      <button onClick={() => router.back()}>
        <IoArrowBackSharp className="h-10 w-10 text-zinc-800" />
      </button>
      <h1 className="font-semibold text-xl ml-6 text-zinc-800">Post</h1>
    </header>
  )
}
