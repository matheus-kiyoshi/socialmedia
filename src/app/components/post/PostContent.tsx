import Link from "next/link";

export function PostContent({ id, text }: { id: string, text: string }) {
	return (
		<div className='w-full text-left pr-3 leading-5'>
			<Link href={`/post/${id}`}>
				<p>{text}</p>
			</Link>
		</div>
	)
}
