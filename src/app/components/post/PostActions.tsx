'use client'
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineRetweet } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import useLike from "../customHooks/useLike";
export function PostActions({comments, likes, reposts, id}: {comments: number, likes: string[], reposts: number, id: string}) {
	const [liked, setLiked] = useState(false)
	const [reposted, setReposted] = useState(false)
	const [likedCount, setLikedCount] = useState(likes.length)
	const [repostedCount, setRepostedCount] = useState(reposts)
	const session = useSession()

	useEffect(() => {
		verifyIfIsLiked()
	}, [])

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
		if (response) {
			console.log(response)
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

	const verifyIfIsLiked = () => {
		if (likes.length > 0) {
			if (session.data) {
				if (likes.includes(session.data.user.id)) {
					setLiked(true)
				}
			}
		}
	}
	
	return (
		<div className='flex items-center mt-2 gap-6'>
			<button>
				<p className='flex justify-center items-center text-sm text-gray-600 cursor-pointer transition-all gap-1 hover:opacity-80'>
					<FaRegComment className='h-5 w-5' />
					{formatNumber(comments)}
				</p>
			</button>
			<button onClick={() => {
				setReposted(!reposted)
				setRepostedCount(reposted ? repostedCount - 1 : repostedCount + 1)
			}}>
				<p className={`flex justify-center items-center text-sm cursor-pointer transition-all gap-1 hover:text-green-700 ${reposted ? 'text-green-700' : 'text-gray-600'}`}>
					<AiOutlineRetweet className='h-5 w-5' />
					{formatNumber(repostedCount)}
				</p>
			</button>
			<button onClick={handleLike}>
				<p className={`flex justify-center items-center text-sm cursor-pointer transition-all gap-1 hover:text-red-600 ${liked ? 'text-red-600' : 'text-gray-600'}`}>
					<AiFillHeart className='h-5 w-5' />
					{formatNumber(likedCount)}
				</p>
			</button>
		</div>
	)
}