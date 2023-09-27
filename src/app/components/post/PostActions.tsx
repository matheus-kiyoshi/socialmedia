'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineRetweet } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
export function PostActions({comments, likes, reposts, id}: {comments: number, likes: number, reposts: number, id: string}) {
	const [liked, setLiked] = useState(false)
	const [reposted, setReposted] = useState(false)
	const [likedCount, setLikedCount] = useState(likes)
	const [repostedCount, setRepostedCount] = useState(reposts)
	const BASEURL = 'https://incognitosocial.vercel.app/api'

	useEffect(() => {
		const abortController = new AbortController()
		const signal = abortController.signal

		handleLike(id, signal)

		return () => {
			abortController.abort()
		}
	}, [liked])

	useEffect(() => {
		const abortController = new AbortController()
		const signal = abortController.signal
		
		handleRepost(id, signal)

		return () => {
			abortController.abort()
		}
	}, [reposted])

	const handleLike = async (id: string, signal: any) => {
		const jwt = localStorage.getItem('jwt')
		if (jwt) {
			const response = await axios.post(`${BASEURL}/posts/${id}/like`, {
				headers: {
					Authorization: `Bearer ${jwt}`
				}
			}, { signal })
			const liked = response.data
			return liked
		}
	}

	const handleRepost = async (id: string, signal: any) => {
		const jwt = localStorage.getItem('jwt')
		if (jwt) {
			const response = await axios.post(`${BASEURL}/posts/${id}/repost`, {
				headers: {
					Authorization: `Bearer ${jwt}`
				}
			}, { signal })
			const reposted = response.data
			return reposted
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
			<button onClick={() => {
				setLiked(!liked)
				setLikedCount(liked ? likedCount - 1 : likedCount + 1)
			}}>
				<p className={`flex justify-center items-center text-sm cursor-pointer transition-all gap-1 hover:text-red-600 ${liked ? 'text-red-600' : 'text-gray-600'}`}>
					<AiFillHeart className='h-5 w-5' />
					{formatNumber(likedCount)}
				</p>
			</button>
		</div>
	)
}