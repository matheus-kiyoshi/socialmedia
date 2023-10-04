import { Popover, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";

export function PostInformation({nickname, username, time}: {nickname: string, username: string, time: string}) {
	const [date, setDate] = useState('')
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	useEffect(() => {
		setDate(calculateElapsedTime(time))
	}, []);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const idButton = open ? 'simple-popover' : undefined;

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
					<Link href={`/${username}`} className='mr-1'>
						@{username}
					</Link>
					• {date}
				</h3>
			</div>
			<button aria-describedby={idButton} type='button' onClick={handleClick} className='flex items-center justify-center mr-2'>
				<FiMoreHorizontal className='h-4 w-4 cursor-pointer' />
			</button>
			<Popover
				id={idButton}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
			>
				<Typography sx={{ p: 2 }}>
					<Link href={`/report`}> 
						<p className='flex justify-center items-center text-sm cursor-pointer transition-all gap-1 hover:text-blue-600'>Report Post</p>
					</Link>
				</Typography>
			</Popover>
		</div>
	)
}