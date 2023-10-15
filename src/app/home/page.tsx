'use client'
import { useEffect, useState } from 'react'
import '../globals.css'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import PostComponent from '../components/post/PostComponent'
import RepostComponent from '../components/repost/RepostComponent'
import Link from 'next/link'
import { Post } from '@/interfaces/Post'
import { User } from '@/interfaces/User'

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const session = useSession()
  const BASEURL = 'https://incognitosocial.vercel.app/api'

  useEffect(() => {
    getPosts()
  }, [])

  async function getPosts(skip?: number) {
    skip = skip || 0
    try {
      const response = await axios.get(`${BASEURL}/posts?skip=${skip}`)
      const postings = await getUsers(response.data)
      const post = [...posts, ...postings]
      setPosts(post)
    } catch (error) {
      console.error('Error retrieving posts:', error)
    }
  }

  async function getUsers(posts: Post[]) {
    const storedUser = sessionStorage.getItem('user')
    const verifiedUser = storedUser ? JSON.parse(storedUser) : []

    for (const post of posts) {
      const existingUser = verifiedUser.find(
        (user: User) => user.username === post.username,
      )

      if (existingUser) {
        post.author = existingUser
      } else {
        try {
          const response = await axios.get(`${BASEURL}/users/${post.username}`)
          const user = response.data

          verifiedUser.push(user)

          sessionStorage.setItem('user', JSON.stringify(verifiedUser))

          post.author = user
        } catch (error) {
          console.error(`Erro ao buscar usuário ${post.username}:`, error)
        }
      }
    }

    return posts
  }

  const handleClick = () => {
    getPosts(posts.length)
  }

  const verifyPostType = (post: Post, index: number) => {
    if (post.type === 'post') {
      return <PostComponent key={index} post={post} />
    } else if (post.type === 'repost') {
      return <RepostComponent key={index} post={post} />
    } else if (post.type === 'comment') {
      return (
        <>
          <Link
            href={`/post/${post.originalPost}`}
            className="text-blue-400 text-sm ml-4 mt-3 italic"
          >
            — Reply to {post.username}
          </Link>
          <PostComponent key={index} post={post} />
        </>
      )
    }
  }

  return (
    <main className="grid-area-main mb-16 sm:mb-0">
      <button
        onClick={handleClick}
        className={`w-full h-6 py-4 flex items-center justify-center border-b border-blue-400 cursor-pointer sticky ${
          session.data ? 'top-16' : 'top-24'
        } bg-white z-20`}
      >
        Recent Posts
      </button>
      {posts ? (
        posts.map((post: Post, index: number) => verifyPostType(post, index))
      ) : (
        <p>SEM POSTS</p>
      )}
      <button
        onClick={handleClick}
        className={`w-full h-6 py-8 flex items-center justify-center border-b text-blue-400 text-lg border-blue-400 cursor-pointer bg-white font-semibold`}
      >
        Load More Posts
      </button>
    </main>
  )
}
