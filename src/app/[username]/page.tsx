'use client'
import { usePathname } from "next/navigation";
import ProfileComponent from "../components/profile/ProfileComponent";
import { useEffect, useState } from "react"
import axios from "axios";
import PostComponent from "../components/post/PostComponent";
import ProfileNav from "../components/profile/ProfileNav";
import RepostComponent from "../components/repost/RepostComponent";
import Link from "next/link";
import ProfileHeader from "../layout/ProfileHeader";

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
	const [section, setSection] = useState('post')
	const pathname = usePathname()
	
	useEffect(() => {
		getUser()
	}, [])

	async function getUser() {
		const response = await axios.get(`https://incognitosocial.vercel.app/api/users${pathname}`)
		setUser(response.data)
		if (response.data.posts.length > 0) {
			getPosts(response.data.username, response.data, posts.length)
		}
	}

	async function getPosts(username: string, user: User, skip?: number) {
		skip = skip ? skip : 0
		const response = await axios.get(`https://incognitosocial.vercel.app/api/users/${username}/posts?skip=${skip}`)
		const postsArray = response.data
		postsArray.map((post: Post) => {
			post.author = user 
		})
		const post = [...posts, ...postsArray]
		setPosts(post)
	}

	const handlePostSection = () => {
		setSection('post')
	}

	const handleRepostSection = () => {
		setSection('repost')
	}

	const handleCommentSection = () => {
		setSection('comment')
	}

	return (
		<>
			<ProfileHeader user={user} />
			<main>
				{user && (			
					<ProfileComponent user={user} />
				)}
				<ProfileNav section={section} handlePostSection={handlePostSection} handleRepostSection={handleRepostSection} handleCommentSection={handleCommentSection} />
				{section == 'post' && (
					posts ? (
						posts.map((post) => (
							post.type == 'post' && <PostComponent key={post._id} post={post} />
						))
					) : (
						<p>Sem Posts</p>
					)
				)}
				{section == 'repost' && (
					posts ? (
						posts.map((post) => (
							post.type == 'repost' && <RepostComponent key={post._id} post={post} />
						))
					) : (
						<p>Sem Posts</p>
					)
				)}
				{section == 'comment' && (
					posts ? (
						posts.map((post) => (
							post.type == 'comment' && (
								<>
									<Link href={`/post/${post.originalPost}`} className='text-blue-400 text-sm ml-4 mt-3 italic'>— Reply to {post.username}</Link>
									<PostComponent key={post._id} post={post} />
								</>
							)
						))
					) : (
						<p>Sem Posts</p>
					)
				)}
			</main>
		</>
	)
}