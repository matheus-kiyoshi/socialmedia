'use client'
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
	const [nickname, setNickname] = useState('');
  const [bio, setBio] = useState('');
	const [banner, setBanner] = useState<File>()
	const [bannerPreview, setBannerPreview] = useState<string>()
	const [icon, setIcon] = useState<File>()
	const [iconPreview, setIconPreview] = useState<string>()
	const session = useSession()
	const iconInputRef = useRef<HTMLInputElement>(null)
	const bannerInputRef = useRef<HTMLInputElement>(null)
	const router = useRouter()
	const pathname = usePathname()

	useEffect(() => {
		getUser()
	}, [])

	async function getUser() {
		const response = await axios.get(`https://incognitosocial.vercel.app/api/users/${pathname.split("/").pop()}`)
		setUser(response.data)
	}

	async function userUpdate() {
		let previewUser = user
		if (previewUser) {
			if (nickname) {
				previewUser.nickname = nickname
			}
			if (bio) {
				previewUser.bio = bio
			}
			if (bannerPreview) {
				previewUser.banner = bannerPreview
			}
			if (iconPreview) {
				previewUser.icon = iconPreview
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
				setBannerPreview(preview);
			}
		}
		userUpdate()
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
				setIconPreview(preview)
			}
		}
		userUpdate()
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

	const handleBannerClose = () => {
		setBanner(undefined);
		setBannerPreview(undefined);
	}
	
	const handleIconClose = () => {
		setIcon(undefined);
		setIconPreview(undefined);
	}

	

	return (
		<main className="w-screen h-screen flex justify-center items-center gap-12">
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
                  value={nickname}
									maxLength={30}
                  onChange={(e) => {
										setNickname(e.target.value)
										userUpdate()
									}}
                  className="border p-2 w-full rounded-md"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="bio" className="text-sm font-medium">Bio</label>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => {
										setBio(e.target.value)
										userUpdate()
									}}
                  className="border p-2 w-full rounded-md"
                />
              </div>
						</div>
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