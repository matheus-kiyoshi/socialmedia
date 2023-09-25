import { AiFillHeart, AiOutlineHeart, AiOutlineRetweet } from 'react-icons/ai'
import '../globals.css'
import { FiMoreHorizontal } from 'react-icons/fi'
import { FaRegComment } from 'react-icons/fa'
import img from '@/../public/repository-open-graph-template.png'
import Image from 'next/image'

export default function Post() {
	let liked = false
  let reposted = false

	const data = [
		img
	]

	return (
		<article className='w-full p-2 border-b flex cursor-pointer hover:bg-gray-50 transition-all duration-75'>
        <figure className='h-10 w-12 rounded-full'>
          <img src="favicon.ico" alt="Profile Picture" className='w-12 h-10'/>
        </figure>
        <div className='ml-2 w-full'>
          <div className='w-full flex items-center justify-between'>
            <div className='flex justify-center items-center gap-2'>
              <h2 className='font-bold'>nickname</h2>
              <h3 className='font-light text-gray-600 text-sm'>@username • 3h</h3>
            </div>
            <button className='flex items-center justify-center mr-2'>
              <FiMoreHorizontal className='h-4 w-4 cursor-pointer' />
            </button>
          </div>
          <div className='w-full text-left pr-3 leading-5'>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore facilis, incidunt maiores ad cum voluptatibus nostrum voluptate, laborum non blanditiis saepe. Amet incidunt rerum consequatur ipsam esse voluptate eaque dicta!</p>
          </div>
					{data.length > 0 && (
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
					)}
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
        </div>
      </article>
	)
}
