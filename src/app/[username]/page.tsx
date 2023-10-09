'use client'
import { usePathname } from "next/navigation";
import ProfileComponent from "../components/profile/ProfileComponent";
import { useEffect, useState } from "react"
import axios from "axios";
import PostComponent from "../components/post/PostComponent";

type User = {
  _id: string
  username: string
  nickname: string
  bio: string
  icon: string
	posts: string[]
	followers: string[]
	following: string[]
}

type Post = {
  authorID: string
	author: User
  username: string
  content: string
  media: string[]
  coments: string[]
  likes: string[]
  reposts: string[]
  repostsAuthorId: string[]
  date: string
  wasEdited: boolean
  type: 'comment' | 'post' | 'repost'
  originalPost: string | null
  _id: string
}

export default function ProfilePage() {
	const [user, setUser] = useState<User | undefined>()
	const [posts, setPosts] = useState<Post[]>([])
	const pathname = usePathname()
	
	useEffect(() => {
		getUser()
	}, [])

	async function getUser() {
		const profileStored = sessionStorage.getItem('profile')
		if (profileStored) {
			const storedUser = JSON.parse(profileStored)
			if (storedUser?.username == pathname) {
				setUser(storedUser)
				return
			}
		}
		const response = await axios.get(`https://incognitosocial.vercel.app/api/users${pathname}`)
		setUser(response.data)
		sessionStorage.setItem('profile', JSON.stringify(response.data))
	
		if (response.data.posts.length > 0) {
			getPosts(response.data.posts)
		}
	}

	async function getPosts(postsID: string[]) {
		postsID.map(async (postID) => {
			const response = await axios.get(`https://incognitosocial.vercel.app/api/posts/${postID}`)
			const post = response.data
			post.author = user
			setPosts(prevPosts => [...prevPosts, post])
		})
	}

	return (
		<main>
			{user && (			
				<ProfileComponent user={user} />
			)}
			{posts ? (
				posts.map((post) => (
					<PostComponent key={post._id} post={post} />
				))
			) : (
				<p>Sem Posts</p>
			)}
		</main>
	)
}