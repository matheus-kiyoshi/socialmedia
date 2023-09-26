'use client'
import { useState } from "react";
import { AiFillHeart, AiOutlineRetweet } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
export function PostActions() {
	const [liked, setLiked] = useState(false)
	const [reposted, setReposted] = useState(false) 
	
	return (
		<div className='flex items-center mt-2 gap-6'>
			<button>
				<p className='flex justify-center items-center text-sm text-gray-600 cursor-pointer transition-all gap-1 hover:opacity-80'>
					<FaRegComment className='h-5 w-5' />
					12k
				</p>
			</button>
			<button onClick={() => setReposted(!reposted)}>
				<p className={`flex justify-center items-center text-sm cursor-pointer transition-all gap-1 hover:text-green-700 ${reposted ? 'text-green-700' : 'text-gray-600'}`}>
					<AiOutlineRetweet className='h-5 w-5' />
					12k
				</p>
			</button>
			<button onClick={() => setLiked(!liked)}>
				<p className={`flex justify-center items-center text-sm cursor-pointer transition-all gap-1 hover:text-red-600 ${liked ? 'text-red-600' : 'text-gray-600'}`}>
					<AiFillHeart className='h-5 w-5' />
					12k
				</p>
			</button>
		</div>
	)
}