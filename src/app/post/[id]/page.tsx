'use client'
import MainPost from '@/app/components/post/MainPost'
import PostComponent from '@/app/components/post/PostComponent'
import RepostComponent from '@/app/components/repost/RepostComponent'
import axios from 'axios'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

type User = {
  _id: string
  username: string
  nickname: string
  bio: string
  icon: string
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

export default function PostPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [post, setPost] = useState<Post>()
  const [originalPost, setOriginalPost] = useState<Post>()
  const pathname = usePathname()
  const BASEURL = 'https://incognitosocial.vercel.app/api'
  const id = pathname.split('/').pop()

  useEffect(() => {
    if (id) {
      getPost(id)
      getPosts(id)
    }
  }, [])

  async function getPost(id: string) {
    const response = await fetch(
      `https://incognitosocial.vercel.app/api/posts/${id}`,
    )
    const post = await response.json()
    const response2 = await fetch(
      `https://incognitosocial.vercel.app/api/users/${post.username}`,
    )
    const user = await response2.json()
    post.author = user
    if (post?.type === 'comment' && post?.originalPost) {
      getOriginalPost(post?.originalPost)
    }
    setPost(post)
  }

  async function getPosts(id: string, skip?: number) {
    skip = skip || 0
    try {
      const response = await axios.get(
        `${BASEURL}/posts/${id}/comments?skip=${skip}`,
      )
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

  async function getOriginalPost(id: string) {
    const response = await axios.get(
      `https://incognitosocial.vercel.app/api/posts/${id}`,
    )
    const postAuthor = await axios.get(
      `https://incognitosocial.vercel.app/api/users/${response.data.username}`,
    )
    const post = response.data
    post.author = postAuthor.data
    setOriginalPost(post)
  }

  const handleClick = () => {
    if (id) getPosts(id, posts.length)
  }

  return (
    <main>
      {originalPost && (
        <PostComponent key={originalPost._id} post={originalPost} />
      )}
      {post ? <MainPost post={post} /> : <p>Loading</p>}
      {posts ? (
        posts.map((post) => <PostComponent key={post._id} post={post} />)
      ) : (
        <p>No Comments</p>
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
