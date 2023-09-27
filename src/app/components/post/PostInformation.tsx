import Link from "next/link";
import { useEffect, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";

export function PostInformation({nickname, username, time}: {nickname: string, username: string, time: string}) {
	const [date, setDate] = useState('')

	useEffect(() => {
		setDate(calculateElapsedTime(time))
	}, []);

	function calculateElapsedTime(initialDate: string): string {
		const actualDate = new Date();
		const dateObj = new Date(initialDate);
	
		const actualMS = actualDate.getTime();
		const oldMS = dateObj.getTime();
	
		const msDiff = actualMS - oldMS;
	
		const secondsDiff = Math.floor(msDiff / 1000);
	
		if (secondsDiff < 60) {
			return `${secondsDiff}s`;
		} else if (secondsDiff < 3600) {
			const minutes = Math.floor(secondsDiff / 60);
			return `${minutes}min`;
		} else if (secondsDiff < 86400) {
			const hours = Math.floor(secondsDiff / 3600);
			return `${hours}h`;
		} else {
			const days = Math.floor(secondsDiff / 86400);
			return `${days}d`;
		}
	}

	return (
		<div className='w-full flex items-center justify-between'>
			<div className='flex justify-center items-center gap-2'>
				<h2 className='font-bold hover:underline underline-offset-1'>
					<Link href={`/${username}`}>
						{nickname}
					</Link>
				</h2>
				<h3 className='font-light text-gray-600 text-sm'>
					<Link href={`/${username}`}>
						@{username}
					</Link>
					• {date}
				</h3>
			</div>
			<button className='flex items-center justify-center mr-2'>
				<FiMoreHorizontal className='h-4 w-4 cursor-pointer' />
			</button>
		</div>
	)
}