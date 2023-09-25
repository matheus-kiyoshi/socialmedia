import Image, { StaticImageData } from "next/image"

export function PostMedia({data}: {data: StaticImageData[]}) {
	return (
		<table className='border border-white rounded-2xl mx-4 my-2 border-separate'>
			<tbody>
			{data.length === 1 ? (
				<tr className='w-full h-full'>
					<td className='w-full h-full bg-cover'><Image src={data[0]} alt="" className='bg-cover h-full w-full rounded-2xl'/></td>
				</tr>
			) : (
				<>
					<tr className='rounded-2xl'>
						<td rowSpan={data.length === 2 ? 2 : 1} className={`h-28 ${data.length < 3 && 'rounded-2xl'}`}><Image src={data[0]} alt="" className='h-full w-full rounded-tl-2xl' /></td>
						{data.length > 1 && <td rowSpan={data.length === 2 ? 2 : 1} className={`h-28 ${data.length < 3 && 'rounded-2xl'}`}><Image src={data[1]} alt="" className='h-full w-full rounded-tr-2xl' /></td>}
					</tr>
					<tr>
						{data.length > 2 && <td colSpan={data.length === 3 ? 2 : 1} className='h-28'><Image src={data[2]} alt="" className={`h-full w-full rounded-b-2xl ${data.length > 3 && 'rounded-br-none'}`}/></td>}
						{data.length === 4 && <td className='h-28'><Image src={data[3]} alt="" className='h-full w-full rounded-br-2xl' /></td>}
					</tr>
				</>
			)}
			</tbody>
		</table>
	)
}
