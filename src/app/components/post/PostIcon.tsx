import { StaticImageData } from 'next/image'
import Icon from '../Icon'

export function PostIcon({
  username,
  image,
}: {
  username: string
  image: string | StaticImageData
}) {
  return <Icon username={username} icon={image} />
}
