import { usePathname, useRouter } from "next/navigation"

export default function ProfileEdit() {
	const router = useRouter()
	const pathname = usePathname()
	
	const handleClick = () => {
		router.push(`/profile/edit/${pathname.split("/").pop()}`)
	}

	return (
		<button onClick={handleClick} className='rounded-2xl py-1.5 px-6 bg-blue-400 text-white font-medium text-xl'>Edit Profile</button>
	)
}