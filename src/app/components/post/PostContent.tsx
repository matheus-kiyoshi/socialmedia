export function PostContent({ text }: { text: string }) {
	return (
		<div className='w-full text-left pr-3 leading-5'>
			<p>{text}</p>
		</div>
	)
}
