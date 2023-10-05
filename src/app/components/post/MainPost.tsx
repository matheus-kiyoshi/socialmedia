import { Post } from ".";
import { MainPostActions } from "./MainPostActions";
import { MainPostContent } from "./MainPostContent";
import { PostInformationNoDate } from "./PostInformationNoDate";

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

export default function MainPost({ post }: { post: Post }) {
	const postDate = new Date(post.date);

  const hours = postDate.getHours();
  const minutes = postDate.getMinutes();

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const month = months[postDate.getMonth()];

  const day = postDate.getDate();

  const year = postDate.getFullYear();

	const formattedTime = (time: number) => {
		if (time < 10) {
			return `0${time}`;
		} else {
			return `${time}`
		}
	}

	return (
		<article key={post._id} className='w-full p-2 border-b flex flex-col gap-2'>
			<div className='flex gap-2'>
				<Post.Icon username={post.username} image={post.author?.icon} />
				<PostInformationNoDate nickname={post.author.nickname} username={post.username} />
			</div>
			<Post.ContentRoot>
				<MainPostContent id={post._id} text={post.content} />
				{post.media.length > 0 && <Post.Media data={post.media} />}
				<div className='flex justify-start items-center gap-3 font-light text-gray-600 my-3'>
					<p>{formattedTime(hours)}:{formattedTime(minutes)}</p>
					<p>{month} {day}, {year}</p>
				</div>
				<MainPostActions comments={post.coments.length} likes={post.likes} reposts={post.reposts} repostsAuthorId={post.repostsAuthorId} id={post._id} />
			</Post.ContentRoot>
		</article>
	)
}