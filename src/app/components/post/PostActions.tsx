import { AiFillHeart, AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";

export function PostActions() {
	let reposted = true
	let liked = true 
	
	return (
		<div className='flex items-center mt-2 gap-6'>
			<button>
				<p className='flex justify-center items-center text-sm text-gray-600 cursor-pointer transition-all gap-1'>
					<FaRegComment className='h-5 w-5' />
					12k
				</p>
			</button>
			<button>
				{reposted ? (
					<p className='flex justify-center items-center text-sm text-green-600 cursor-pointer transition-all gap-1'>
						<AiOutlineRetweet className='h-5 w-5' />
						12k
					</p>
				) : (
					<p className='flex justify-center items-center text-sm text-gray-600 cursor-pointer transition-all gap-1'>
						<AiOutlineRetweet className='h-5 w-5' />
						12k
					</p>
				)}
			</button>
			<button>
				{liked ? (
					<p className='flex justify-center items-center text-sm text-red-600 cursor-pointer transition-all gap-1'>
						<AiFillHeart className='h-5 w-5' />
						12k
					</p>
				) : (
					<p className='flex justify-center items-center text-sm text-gray-600 cursor-pointer transition-all gap-1'>
						<AiOutlineHeart className='h-5 w-5' />
						12k
					</p>
				)}
			</button>
		</div>
	)
}