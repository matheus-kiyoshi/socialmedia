export function PostIcon({image}: {image: string}) {
	return (
		<figure className='h-10 w-12 rounded-full'>
			<img src={image} alt="Profile Picture" className='w-12 h-10'/>
		</figure>
	)
}
