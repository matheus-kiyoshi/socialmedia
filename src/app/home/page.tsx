'use client'
import { useEffect, useState } from 'react'
import { Post } from '../components/post'
import '../globals.css'
import axios from 'axios'
import { useSession } from 'next-auth/react'

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
 const [posts, setPosts] = useState<Post[]>([]);
 const session = useSession()
 const BASEURL = 'https://incognitosocial.vercel.app/api';
 
 useEffect(() => {
   getPosts();
 }, []);
 
  async function getPosts(skip?: number) {
    skip = skip ? skip : 0
    try {
      const response = await axios.get(`${BASEURL}/posts?skip=${skip}`);
      const postings = await getUsers(response.data);
      const post = [...posts, ...postings];
      setPosts(post);
    } catch (error) {
      console.error('Error retrieving posts:', error);
    }
  }

  async function getUsers(posts: Post[]) {
    const storedUser = sessionStorage.getItem('user')
    const verifiedUser = storedUser ? JSON.parse(storedUser) : []

    for (const post of posts) {
      const existingUser = verifiedUser.find((user: User) => user.username === post.username)

      if (existingUser) {
        post.author = existingUser
      } else {
        try {
          const response = await axios.get(`${BASEURL}/users/${post.username}`);
          const user = response.data;

          verifiedUser.push(user);

          sessionStorage.setItem('user', JSON.stringify(verifiedUser));

          post.author = user;
        } catch (error) {
          console.error(`Erro ao buscar usuário ${post.username}:`, error);
        }
      }
    } 

    return posts;
  }

  const handleClick = () => {
    getPosts(posts.length)
  }

  return (
    <main className="grid-area-main mb-16 sm:mb-0">
      <button onClick={handleClick} className={`w-full h-6 py-4 flex items-center justify-center border-b border-blue-400 cursor-pointer sticky ${session.data ? 'top-16' : 'top-24'} bg-white z-20`}>More Posts</button>
      {posts ? (
        posts.map((post: Post) => (
          <Post.Root key={post._id}>
            <Post.Icon username={post.username} image={post.author?.icon} />
            <Post.ContentRoot>
              <Post.Information 
                nickname={post.author?.nickname}
                username={post.username}
                time={post.date}
              />
              <Post.Content id={post._id} text={post.content} />
              {post.media.length > 0 && <Post.Media data={post.media} />}
              <Post.Actions comments={post.coments.length} likes={post.likes} reposts={post.reposts.length} id={post._id} />
            </Post.ContentRoot>
          </Post.Root>
        ))
      ) : (
        <p>SEM POSTS</p>
      )}
    </main>
  )
}
