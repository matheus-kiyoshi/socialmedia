'use client'
import useEditProfile from "@/app/components/customHooks/useEditProfile"
import ProfileComponent from "@/app/components/profile/ProfileComponent"
import axios from "axios"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { BsImage } from "react-icons/bs"

type User = {
	_id: string
  username: string
  nickname: string
  bio: string
	banner: string
  icon: string
	followers: string[]
	following: string[]
}

export default function EditProfile() {
	const [user, setUser] = useState<User>()
	const [userFields, setUserFields] = useState({
		nickname: '',
		bio: '',
		bannerPreview: '',
		iconPreview: '',
	})
	const [banner, setBanner] = useState<File>()
	const [icon, setIcon] = useState<File>()
	const session = useSession()
	const iconInputRef = useRef<HTMLInputElement>(null)
	const bannerInputRef = useRef<HTMLInputElement>(null)
	const buttonRef = useRef<HTMLButtonElement>(null)
	const router = useRouter()
	const pathname = usePathname()

	useEffect(() => {
		getUser()
	}, [])

	useEffect(() => {
		userUpdate()
	}, [userFields])

	async function getUser() {
		const response = await axios.get(`https://incognitosocial.vercel.app/api/users/${pathname.split("/").pop()}`)
		setUser(response.data)
	}

	async function userUpdate() {
		let previewUser = user
		if (previewUser) {
			if (userFields.nickname) {
				previewUser = {...previewUser, nickname: userFields.nickname}
			}

			if (userFields.bio) {
				previewUser = {...previewUser, bio: userFields.bio}
			}

			if (userFields.bannerPreview) {
				previewUser = {...previewUser, banner: userFields.bannerPreview}
			}

			if (userFields.iconPreview) {
				previewUser = {...previewUser, icon: userFields.iconPreview}
			}
		}

		setUser(previewUser)
	}

	const handleBannerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (banner) {
			return
		}

		if (event.target.files) {
			const file = event.target.files[0];
	
			if (file.type === 'image/jpeg' || file.type === 'image/png') {
				setBanner(file);
	
				const preview = URL.createObjectURL(file);
				setUserFields(prevState => ({...prevState, bannerPreview: preview}))
			}
		}
  }

	const handleIconChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (icon) {
			return
		}

		if (event.target.files) {
			const file = event.target.files[0];
	
			if (file.type === 'image/jpeg' || file.type === 'image/png') {
				setIcon(file);
	
				const preview = URL.createObjectURL(file);
				setUserFields(prevState => ({...prevState, iconPreview: preview}))
			}
		}
  }

	const handleBannerClick = () => {
    if (bannerInputRef.current) {
      bannerInputRef.current.click();
    }
  }

	const handleIconClick = () => {
    if (iconInputRef.current) {
      iconInputRef.current.click();
    }
  }

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setUserFields(prevState => ({...prevState, [e.target.name]: e.target.value}))
	}

	const handleFetch = async () => {
		buttonRef.current?.setAttribute('disabled', 'true')
		const jwt = session.data?.user.accessToken || ''
		if (jwt === '') {
			console.log('sem jwt')
		}
		if (!userFields.nickname) {
			return
		}
		if (!userFields.bio) {
			setUserFields(prevState => ({...prevState, bio: ''}))
		}

		const response = await useEditProfile(userFields.nickname, userFields.bio, jwt, icon, banner)
		if (response) {
			router.push(`/${pathname.split("/").pop()}`)
		}
		buttonRef.current?.setAttribute('disabled', 'false')
	}

	return (
		<main className="w-screen h-screen flex justify-center items-center gap-6 flex-col sm:flex-row sm:gap-10">
			<article className="rounded-lg border p-4 max-w-[440px]">
				<h1 className="text-2xl font-bold ml-6 my-2">Edit Profile</h1>
				{session.data ? (
					<>
						<div className='w-full p-2 border-b flex flex-col transition-all duration-75'>
							<div className="flex items-center gap-2 mb-4">
								<button
									onClick={handleBannerClick}
									className="py-1 px-2.5 rounded-md cursor-pointer disabled:cursor-not-allowed flex gap-3 border"
									disabled={banner ? true : false}
								>
									<BsImage className='w-5 h-5' />
									Banner
								</button>
								<input
									type="file"
									accept=".png, .jpg"
									onChange={handleBannerChange}
									ref={bannerInputRef}
									className="hidden"
									disabled={banner ? true : false}
								/>
							</div>
							<div className="flex items-center gap-2">
								<button
									onClick={handleIconClick}
									className="py-1 px-2.5 rounded-md cursor-pointer disabled:cursor-not-allowed flex gap-3 border"
									disabled={icon ? true : false}
								>
									<BsImage className='w-5 h-5' />
									Icon
								</button>
								<input
									type="file"
									accept=".png, .jpg"
									onChange={handleIconChange}
									ref={iconInputRef}
									className="hidden"
									disabled={icon ? true : false}
								/>
							</div>
							<div className="mt-4">
                <label htmlFor="nickname" className="text-sm font-medium">Nickname</label>
                <input
                  type="text"
                  id="nickname"
                  value={userFields.nickname}
									name="nickname"
									maxLength={30}
                  onChange={handleChange}
                  className="border p-2 w-full rounded-md"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="bio" className="text-sm font-medium">Bio</label>
                <textarea
                  id="bio"
                  value={userFields.bio}
									name="bio"
									maxLength={200}
                  onChange={handleChange}
                  className="border p-2 w-full rounded-md"
                />
              </div>
						</div>
						<button onClick={handleFetch} ref={buttonRef} disabled={userFields.nickname ? false : true} className="bg-blue-400 mt-2 mx-auto text-white py-1 px-2.5 rounded-md disabled:bg-blue-200 disabled:cursor-not-allowed">Save</button>
					</>
				) : (
					<>
						<p>Log in to edit your profile</p>
						<Link href="/api/auth/signin" className="bg-blue-400 text-white py-1 px-2.5 rounded-md disabled:bg-blue-200 disabled:cursor-not-allowed">Sign in</Link>
						<p>Doesn't have an account? <Link href="/register" className="text-blue-400">Sign up</Link></p>
					</>
				)}
			</article>
			<article>
				{session.data && (
					<>
						<article className="rounded-lg border p-4 max-w-[440px]">
							<h1 className="text-2xl font-bold ml-6 my-2">Preview</h1>
							{user && (
								<ProfileComponent user={user} />
							)}
						</article>
					</>
				)}
			</article>
		</main>
	)
}