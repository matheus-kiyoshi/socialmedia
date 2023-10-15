import { User } from './User'

export type Post = {
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
