import Link from 'next/link'
import { GiFeather } from 'react-icons/gi'

export default function CreatePostButton() {
  return (
    <Link
      href={'/compose/post'}
      className="fixed bottom-16 right-2 py-2 z-10 hover:opacity-80 sm:static lg:w-full"
    >
      <button className="bg-blue-400 p-3 rounded-full border border-white flex lg:w-full items-center justify-center">
        <GiFeather className="h-8 w-8 text-white" />
        <p className="hidden lg:block ml-2 text-white text-lg font-medium">
          Post
        </p>
      </button>
    </Link>
  )
}
