import axios from 'axios'
import { useEffect, useState } from 'react'
import { Post } from '.'

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

export default function MainRepost({ post }: { post: Post }) {
  const [originalPost, setOriginalPost] = useState<Post>()

  useEffect(() => {
    if (post.originalPost) {
      getOriginalPost(post.originalPost)
    }
  }, [post.originalPost])

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

  return (
    originalPost && (
      <div className="p-2 border rounded-lg m-2 flex gap-4 cursor-pointer hover:bg-gray-50 transition-all duration-75">
        <Post.Icon
          username={originalPost.username}
          image={originalPost.author?.icon}
        />
        <Post.ContentRoot>
          <Post.Information
            nickname={originalPost.username}
            username={originalPost.username}
            time={originalPost.date}
            postID={originalPost._id}
          />
          <Post.Content id={originalPost._id} text={originalPost.content} />
          {originalPost.media.length > 0 && (
            <Post.Media data={originalPost.media} />
          )}
        </Post.ContentRoot>
      </div>
    )
  )
}
