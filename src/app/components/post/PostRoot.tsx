import Link from "next/link"

export function PostRoot({ id, children }: { id: string, children: React.ReactNode }) {
	return (
		<article className='w-full p-2 border-b flex cursor-pointer hover:bg-gray-50 transition-all duration-75'>
				{children}
			</article>
	)
}
