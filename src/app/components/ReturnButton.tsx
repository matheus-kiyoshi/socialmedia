import { useRouter } from 'next/navigation'
import { IoArrowBackSharp } from 'react-icons/io5'

export default function ReturnButton() {
	const router = useRouter()

	return (
		<button
			onClick={() => router.back()}
			className="rounded-full p-1 bg-zinc-700"
		>
			<IoArrowBackSharp className="h-8 w-8 text-white" />
		</button>
	)
}