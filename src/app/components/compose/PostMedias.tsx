import { MdCancel } from 'react-icons/md'

export function PostMedias({data, handleClose}: {data: string[], handleClose: (fileNumber: number) => void}) {
	return (
		<table className='border border-white rounded-2xl mx-4 my-2 border-separate z-0'>
			<tbody>
			{data.length === 1 ? (
				<tr className='w-full h-full'>
					<td className='w-full h-full bg-cover hover:opacity-80 relative'>
						<button onClick={() => handleClose(0)} className='absolute top-2 right-2'>
							<MdCancel className='w-6 h-6 z-30' />
						</button>
						<img src={data[0]} alt="" className='bg-cover h-full w-full rounded-2xl'/>
					</td>
				</tr>
			) : (
				<>
					<tr className='rounded-2xl'>
						<td rowSpan={data.length === 2 ? 2 : 1} className={`h-28 w-1/2 hover:opacity-80 relative ${data.length < 3 && 'rounded-2xl'}`}>
							<button onClick={() => handleClose(0)} className='absolute top-2 right-2'>
								<MdCancel className='w-6 h-6 z-30' />
							</button>
							<img src={data[0]} alt="" className='h-full w-full rounded-tl-2xl' />
						</td>

						{data.length > 1 && (
							<td rowSpan={data.length === 2 ? 2 : 1} className={`h-28 w-1/2 hover:opacity-80 relative ${data.length < 3 && 'rounded-2xl'}`}>
								<button onClick={() => handleClose(0)} className='absolute top-2 right-2'>
									<MdCancel className='w-6 h-6 z-30' />
								</button>
								<img src={data[1]} alt="" className='h-full w-full rounded-tr-2xl' />
							</td>
						)}
					</tr>
					<tr>
						{data.length > 2 && (
							<td colSpan={data.length === 3 ? 2 : 1} className='h-28 hover:opacity-80 relative'>
								<button onClick={() => handleClose(0)} className='absolute top-2 right-2'>
									<MdCancel className='w-6 h-6 z-30' />
								</button>
								<img src={data[2]} alt="" className={`h-full w-full rounded-b-2xl ${data.length > 3 && 'rounded-br-none'}`}/>
							</td>
						)}

						{data.length === 4 && (
							<td className='h-28 hover:opacity-80 flex relative'>
								<button onClick={() => handleClose(0)} className='absolute top-2 right-2'>
									<MdCancel className='w-6 h-6 z-30' />
								</button>
								<img src={data[3]} alt="" className='h-full w-full rounded-br-2xl' />
							</td>
						)}
					</tr>
				</>
			)}
			</tbody>
		</table>
	)
}
