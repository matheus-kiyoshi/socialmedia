'use client'
import { PostMedias } from "@/app/components/compose/PostMedias";
import useCreatePost from "@/app/components/customHooks/useCreatePost";
import useRepost from "@/app/components/customHooks/useRepost";
import { Post } from "@/app/components/post";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { BsImage } from "react-icons/bs";

export default function ComposeRepost() {
	const [text, setText] = useState('')
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const [imagePreviews, setImagePreviews] = useState<string[]>([]);
	const session = useSession()
	const fileInputRef = useRef<HTMLInputElement>(null)
	const router = useRouter()
	const pathname = usePathname()

	const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value
    if (newText.length <= 256) {
      setText(newText)
    }
  }

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (selectedFiles.length === 4) {
			return
		}

    if (event.target.files) {
      const files = Array.from(event.target.files)

      const validFiles = files.filter(
        (file) => file.type === 'image/jpeg' || file.type === 'image/png'
      )

      setSelectedFiles([...selectedFiles, ...validFiles])

      const previews = validFiles.map((file) => URL.createObjectURL(file))
      setImagePreviews([...imagePreviews, ...previews])
    }
  }

	const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

	const handleClose = (fileNumber: number) => {
		const newPreviews = [...imagePreviews]
		newPreviews.splice(fileNumber, 1)
		setImagePreviews(newPreviews)
		if (selectedFiles !== null) {
			const newSelectedFiles = [...selectedFiles];
			newSelectedFiles.splice(fileNumber, 1);
			setSelectedFiles(newSelectedFiles);
		}	
	}

	const handlePost = async () => {
		const jwt = session.data?.user.accessToken || ''
		if (jwt === '') {
			console.log('sem jwt')
		}
		if (!text) {
			return
		}
		if (!selectedFiles) {
			setSelectedFiles([])
		}
		const id = pathname.split("/")[2]
		const response = await useRepost(id, jwt, text, selectedFiles)
		if (response) {
			router.push('/home')
		}
	}
	
	return (
		<main className="w-screen h-screen flex justify-center items-center">
			<article className="rounded-lg border p-4 max-w-[440px]">
				<h1 className="text-2xl font-bold ml-6 my-2">Compose Repost</h1>
				{session.data ? (
					<>
						<Post.Root>
							<Post.Icon username={session.data?.user?.username} image={session.data?.user?.icon} />
							<Post.ContentRoot>
								<textarea
									rows={5}
									placeholder="What's on your mind?"
									className="ml-2 p-3 rounded-sm w-full text-left pr-3 leading-5"
									value={text}
									onChange={handleTextChange}
								/>
								{imagePreviews.length > 0 && (
									<PostMedias data={imagePreviews} handleClose={handleClose} />
								)}
							</Post.ContentRoot>
						</Post.Root>
						<div className="w-full h-12 flex justify-between items-center pt-2">
							<div>
							<button
                onClick={handleButtonClick}
                className="py-1 px-2.5 rounded-md cursor-pointer disabled:cursor-not-allowed"
								disabled={selectedFiles.length === 4}
							>
                <BsImage className='w-5 h-5' />
              </button>
							<input
                type="file"
                accept=".png, .jpg"
                multiple
                onChange={handleFileChange}
								ref={fileInputRef}
								className="hidden"
								disabled={selectedFiles.length === 4}
              />
							</div>
							<div className="flex items-center justify-center gap-2">
								<p className={`text-xs pr-2 border-r ${text.length == 256 && 'text-red-600'}`}>{text.length}/256</p>
								<button className="bg-blue-400 text-white py-1 px-2.5 rounded-md disabled:bg-blue-200 disabled:cursor-not-allowed" disabled={text.length < 1 && selectedFiles.length === 0} onClick={handlePost}>Repost</button>
							</div>
						</div>
					</>
				) : (
					<>
						<p>
							Log in to repost
							<Link href="/api/auth/signin" className="bg-blue-400 text-white py-1 px-2.5 rounded-md ml-2 disabled:bg-blue-200 disabled:cursor-not-allowed">Sign in</Link>
						</p>
						<p>
							Doesn't have an account? 
							<Link href="/register" className="text-blue-400">Sign up</Link>
						</p>
					</>
				)}
			</article>
		</main>
	)
}