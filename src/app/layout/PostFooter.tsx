'use client'
import Link from 'next/link'
import '../globals.css'
import { usePathname } from 'next/navigation'

export default function PostFooter() {
  const pathname = usePathname()
  const id = pathname.split('/').pop()

	return (
		<footer className="w-full md:w-[560px] h-12 fixed bottom-0 bg-slate-200 z-10">
      <Link href={`/compose/${id}/comment`} className='w-full h-full flex items-center justify-between'>
        <p className='font-thin italic ml-4'>Post your reply...</p>
        <button className='mr-4 text-white bg-blue-400 rounded-lg px-2 py-1'>Reply</button>
      </Link>
    </footer>
	)
}