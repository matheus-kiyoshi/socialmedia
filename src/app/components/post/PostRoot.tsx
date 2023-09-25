export function PostRoot({ children }: { children: React.ReactNode }) {
	return (
		<article className='w-full p-2 border-b flex cursor-pointer hover:bg-gray-50 transition-all duration-75'>
			{children}
		</article>
	)
}