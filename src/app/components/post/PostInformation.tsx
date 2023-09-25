import { FiMoreHorizontal } from "react-icons/fi";

export function PostInformation({nickname, username, date}: {nickname: string, username: string, date: string}) {
	return (
		<div className='w-full flex items-center justify-between'>
			<div className='flex justify-center items-center gap-2'>
				<h2 className='font-bold'>{nickname}</h2>
				<h3 className='font-light text-gray-600 text-sm'>@{username} • {date}</h3>
			</div>
			<button className='flex items-center justify-center mr-2'>
				<FiMoreHorizontal className='h-4 w-4 cursor-pointer' />
			</button>
		</div>
	)
}