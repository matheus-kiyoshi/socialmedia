'use client'
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineRetweet } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import useLike from "../customHooks/useLike";
import { useRouter } from "next/navigation";
import { Popover, Typography } from "@mui/material";
import Link from "next/link";
import useRepost from "../customHooks/useRepost";

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

export function PostActions({
	comments, 
	likes, 
	reposts, 
	id
}: {
	comments: number, 
	likes: string[], 
	reposts: string[], 
	id: string
}) {
	const [liked, setLiked] = useState(false)
	const [reposted, setReposted] = useState(false)
	const [likedCount, setLikedCount] = useState(likes.length)
	const [repostedCount, setRepostedCount] = useState(reposts.length)
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [verifiedPosts, setVerifiedPosts] = useState<Post[]>([])
	const session = useSession()
	const router = useRouter()

	useEffect(() => {
		getReposts()
		verifyIfIsLikedOrReposted()
	}, [])

	const getReposts = async () => {
		const promises = reposts.map(async (id) => {
			const response = await axios.get('https://incognitosocial.vercel.app/api/posts/' + id)
			return response.data;
		});
	
		const repostsData = await Promise.all(promises);
		setVerifiedPosts(repostsData);
	}

	const handleLike = async () => {
		setLiked(!liked)
		setLikedCount(liked ? likedCount - 1 : likedCount + 1)
		const jwt = session.data?.user.accessToken || ''
		if (jwt === '') {
			return
		}
		if (!id) {
			return
		}
		const response = await useLike(id, jwt)
	}

	const handleRepost = async () => {	
		setReposted(!reposted)
		setRepostedCount(reposted ? repostedCount - 1 : repostedCount + 1)
		const jwt = session.data?.user.accessToken || ''
		if (jwt === '') {
			return
		}
		if (!id) {
			return
		}
		const response = await useRepost(id, jwt)
		if (response) {
			router.refresh()
		}
	}

	const formatNumber = (number: number) => {
		if (number >= 1000000) {
			return (number / 1000000).toFixed(1) + "M";
		} else if (number >= 1000) {
			return (number / 1000).toFixed(1) + "k";
		} else {
			return number.toString();
		}
	}

	const verifyIfIsLikedOrReposted = () => {
		if (session.data) {
			if (likes.length > 0) {
				if (likes.includes(session.data.user.id)) {
					setLiked(true)
				}
			}
			if (reposts.length > 0) {
				if (verifiedPosts.find((post) => post.authorID === session.data.user.id)) {
					setReposted(true)
				}
			}
		}
	}

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const idButton = open ? 'simple-popover' : undefined;
	
	return (
		<div className='flex items-center mt-2 gap-6'>
			<button>
				<p className='flex justify-center items-center text-sm text-gray-600 cursor-pointer transition-all gap-1 hover:opacity-80'>
					<FaRegComment className='h-5 w-5' />
					{formatNumber(comments)}
				</p>
			</button>
			<button aria-describedby={idButton} type='button' onClick={handleClick}>
				<p className={`flex justify-center items-center text-sm cursor-pointer transition-all gap-1 hover:text-green-700 ${reposted ? 'text-green-700' : 'text-gray-600'}`}>
					<AiOutlineRetweet className='h-5 w-5' />
					{formatNumber(repostedCount)}
				</p>
			</button>
			<Popover
        id={idButton}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>
					<button onClick={handleRepost}> 
						<p className='flex justify-center items-center text-sm cursor-pointer transition-all gap-1 hover:text-blue-600'>Repost</p>
					</button>
					<Link href={`/compose/${id}/repost`}> 
						<p className='flex justify-center items-center text-sm cursor-pointer transition-all gap-1 hover:text-blue-600'>Repost with content</p>
					</Link>
				</Typography>
      </Popover>
			<button onClick={handleLike}>
				<p className={`flex justify-center items-center text-sm cursor-pointer transition-all gap-1 hover:text-red-600 ${liked ? 'text-red-600' : 'text-gray-600'}`}>
					<AiFillHeart className='h-5 w-5' />
					{formatNumber(likedCount)}
				</p>
			</button>
		</div>
	)
}