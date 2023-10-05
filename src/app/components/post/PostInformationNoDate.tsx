import { Popover, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";

export function PostInformationNoDate({nickname, username}: {nickname: string, username: string}) {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const idButton = open ? 'simple-popover' : undefined;

	return (
		<div className='w-full flex items-center justify-between'>
			<div className='flex flex-col justify-center items-center'>
				<h2 className='font-bold hover:underline underline-offset-1'>
					<Link href={`/${username}`}>
						{nickname}
					</Link>
				</h2>
				<h3 className='font-light text-gray-600 text-sm ml-3'>
					<Link href={`/${username}`} className='mr-1'>
						@{username}
					</Link>
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