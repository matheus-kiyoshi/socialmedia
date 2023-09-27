'use client'
import { useEffect, useState } from 'react'
import { Post } from './components/post'
import './globals.css'
import img from '@/../public/repository-open-graph-template.png'
import axios from 'axios'

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
  date: string
  wasEdited: boolean
  type: 'comment' | 'post' | 'repost'
  originalPost: string | null
  _id: string
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    getPosts()
  }, [])

  async function getPosts() {
    const BASEURL = 'https://incognitosocial.vercel.app/api'

    const response = await axios.get(`${BASEURL}/posts`)
    const posts = await getUsers(response.data)
    setPosts(posts)
  }

  async function getUsers(posts: Post[]) {
    const BASEURL = 'https://incognitosocial.vercel.app/api';

    let postPromises: Promise<Post>[] = posts.map(async (post: any) => {
      let postAuthor = post;
      const response = await axios.get(`${BASEURL}/users/${post.username}`);
      postAuthor.author = response.data;
      return postAuthor;
    });
    const resolvedPosts = await Promise.all(postPromises);
    
    return resolvedPosts
  }

  return (
    <div className="h-[5000px] grid grid-layout-template">
    <main className="grid-area-main">
      {posts ? (
        posts.map((post: Post) => (
          <Post.Root>
            <Post.Icon image={post.author?.icon} />
            <Post.ContentRoot>
              <Post.Information 
                nickname={post.author?.nickname}
                username={post.username}
                time={post.date}
              />
              <Post.Content text={post.content} />
              <Post.Actions />
            </Post.ContentRoot>
          </Post.Root>
        ))
      ) : (
        <p>SEM POSTS</p>
      )}
    </main>
    </div>
  )
}
