import { Post } from ".";

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

export default function PostComponent({ post }: { post: Post }) {
	return (
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
				<Post.Actions comments={post.coments.length} likes={post.likes} reposts={post.reposts} id={post._id} />
			</Post.ContentRoot>
		</Post.Root>
	)
}